export function stub<T extends {}>(): T {
  const store = new Map();
  return new Proxy({}, {
    get: function (target, prop) {
      if (prop in target) return (target as any)[prop];
      if (!store.has(prop)) store.set(prop, jest.fn())
      return store.get(prop);
    }
  }) as T;
}

export type Stub<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export function reveal<T extends {}>(original: T): Stub<T> {
  return <any>original as Stub<T>;
}
