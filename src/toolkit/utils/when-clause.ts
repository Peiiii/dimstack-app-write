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
