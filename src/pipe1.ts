import { isPromise } from "./promise";

type Pipe1 = <P, F extends (a: P extends Promise<any> ? Awaited<P> : P) => any>(
  a: P,
  f: F
) => ReturnType<F> extends Promise<any>
  ? ReturnType<F>
  : P extends Promise<any>
  ? Promise<ReturnType<F>>
  : ReturnType<F>;

export const pipe1: Pipe1 = (a, f) => {
  return isPromise(a) ? a.then(f as any) : f(a as any);
};
