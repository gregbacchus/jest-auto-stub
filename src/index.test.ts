import { reveal, stub } from './index';

interface MyInterface {
  foo(): string;
}

class MyClass {
  bar(): string {
    return 'foo';
  }
}

describe('stub', () => {
  describe('interface', () => {
    it('will return an object', () => {
      const s = stub<MyInterface>();
      expect(s).toBeDefined();
      expect(s).toMatchObject({});
    });

    it('will track calls to stubbed methods', () => {
      const s = stub<MyInterface>();
      s.foo();
      expect(s.foo).toHaveBeenCalled();
    });

    it('will be able to provide mock results', () => {
      const s = stub<MyInterface>();

      reveal(s).foo.mockReturnValueOnce('bar');

      const result = s.foo();

      expect(s.foo).toHaveBeenCalled();
      expect(result).toBe('bar');
    });
  });

  describe('class', () => {
    it('will return an object', () => {
      const s = stub<MyClass>();
      expect(s).toBeDefined();
      expect(s).toMatchObject({});
    });

    it('will track calls to stubbed methods', () => {
      const s = stub<MyClass>();
      s.bar();
      expect(s.bar).toHaveBeenCalled();
    });

    it('will be able to provide mock results', () => {
      const s = stub<MyClass>();

      {
        const mock = reveal(s);
        mock.bar.mockReturnValueOnce('hello');
        mock.bar.mockReturnValueOnce('world');
      }

      const result = [s.bar(), s.bar()];

      expect(s.bar).toHaveBeenCalled();
      expect(result[0]).toBe('hello');
      expect(result[1]).toBe('world');
    });
  });
});
