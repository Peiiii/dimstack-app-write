// parse vscode like when clause using jsep
// evalWhenClause(when, context) => boolean
// extractDependencies(when) => string[]
// parseWhenClause(when) => {eval, dependencies}
import jsep, {
  Expression,
  Identifier,
  BinaryExpression,
  UnaryExpression,
} from "jsep";

// Minimal local definitions for jsep call/member expressions
interface CallExpression extends Expression {
  type: "CallExpression";
  callee: Expression;
  arguments: Expression[];
}

interface MemberExpression extends Expression {
  type: "MemberExpression";
  object: Expression;
  property: Identifier;
}

// 定义解析结果类型
export interface ParsedWhenClause {
  eval: (context: Record<string, any>) => boolean;
  dependencies: string[];
}

// 解析when子句并返回解析结果
export function parseWhenClause(when: string): ParsedWhenClause {
  const parsedExpression = jsep(when) as Expression;

  const dependencies = extractExpressionDependencies(parsedExpression);
  const evalFunction = createEvalFunction(parsedExpression);

  return {
    eval: evalFunction,
    dependencies,
  };
}

// 提取依赖项（变量）
export function extractExpressionDependencies(
  parsedExpression: Expression
): string[] {
  const dependencies = new Set<string>();

  function traverse(node: Expression) {
    switch (node.type) {
      case "Identifier":
        dependencies.add((node as Identifier).name);
        break;
      case "BinaryExpression":
        traverse((node as BinaryExpression).left);
        traverse((node as BinaryExpression).right);
        break;
      case "UnaryExpression":
        traverse((node as UnaryExpression).argument);
        break;
    }
  }

  traverse(parsedExpression);

  return Array.from(dependencies);
}

// 创建用于评估表达式的函数
export function createEvalFunction(parsedExpression: Expression) {
  return function (context: Record<string, any>): boolean {
    return evaluate(parsedExpression, context);
  };
}

// 评估解析后的表达式
function evaluate(node: Expression, context: Record<string, any>): boolean {
  switch (node.type) {
    case "Literal":
      return node.value as boolean;
    case "CallExpression":
      return evaluateCallExpression(node as CallExpression, context);
    case "Identifier":
      return context[(node as Identifier).name];
    case "BinaryExpression":
      return applyOperator(
        (node as BinaryExpression).operator,
        evaluate((node as BinaryExpression).left, context),
        evaluate((node as BinaryExpression).right, context)
      );
    case "UnaryExpression":
      return applyOperator(
        (node as UnaryExpression).operator,
        evaluate((node as UnaryExpression).argument, context)
      );
    default:
      throw new Error(`Unsupported node type: ${node.type}`);
  }
}

function evaluateCallExpression(
  node: CallExpression,
  context: Record<string, any>
): boolean {
  // Support simple member calls like: name.endsWith("...") / path.startsWith("...")
  const callee = node.callee as Expression;
  if (callee.type === "MemberExpression") {
    const mem = callee as MemberExpression;
    const objectValue = evaluate(mem.object, context);
    const propName = (mem.property as Identifier).name;
    const args = node.arguments.map((arg) =>
      evaluate(arg as Expression, context)
    );

    if (typeof objectValue === "string" && typeof args[0] === "string") {
      if (propName === "endsWith") {
        return (objectValue as string).endsWith(args[0] as string);
      }
      if (propName === "startsWith") {
        return (objectValue as string).startsWith(args[0] as string);
      }
    }
  }

  // For any unsupported call-expression pattern just return false instead
  // of throwing, so that menu "when" clauses fail gracefully.
  return false;
}

// 应用操作符
function applyOperator(operator: string, left: any, right?: any): boolean {
  switch (operator) {
    case "==":
      return left == right;
    case "!=":
      return left != right;
    case "===":
      return left === right;
    case "!==":
      return left !== right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    case "&&":
      return left && right;
    case "||":
      return left || right;
    case "!":
      return !left;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// 测试函数
export function test() {
  const whenClause = "a && b == 'test'";
  const context = {
    a: true,
    b: "test",
  };

  const parsed = parseWhenClause(whenClause);
}

// test();
