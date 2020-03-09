// RecursivePartial definition based on https://stackoverflow.com/a/51365037
type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends Array<infer U> ? Array<RecursivePartial<U>> :
  T[P] extends object ? RecursivePartial<T[P]> :
  T[P];
};

export function stub<T extends {}>(base: RecursivePartial<T> = {}): T {
  const store = new Map();
  return new Proxy(base, {
    get(target, prop) {
      if (prop in target) return (target as any)[prop];
      if (prop === 'then') return undefined;
      if (!store.has(prop)) store.set(prop, jest.fn());
      return store.get(prop);
    },
    has(target, prop) {
      if (prop in target) return true;
      if (prop === 'then') return false;
      return true;
    },
  }) as T;
}

type Fn = (...args: any[]) => any;
type ArgumentTypes<F extends Fn> = F extends (...args: infer A) => any ? A : never;
type StubValue<T> = T extends Fn
  ? jest.Mock<ReturnType<T>, ArgumentTypes<T>>
  : T;

export type Stub<T> = {
  [P in keyof T]: StubValue<T[P]>;
};

export function reveal<T extends {}>(original: T): Stub<T> {
  return original as Stub<T>;
}
