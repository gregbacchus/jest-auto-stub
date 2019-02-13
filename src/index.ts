export function stub<T extends {}>(base: Partial<T> = {}): T {
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

export type Stub<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export function reveal<T extends {}>(original: T): Stub<T> {
  return (original as any) as Stub<T>;
}
