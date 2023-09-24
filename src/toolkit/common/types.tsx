// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;

export type Action = {
  id?: string;
  name?: string;
  title?: string;
  events?: string[];
  run?: (context?: any) => void;
  icon?: React.ReactElement;
};
