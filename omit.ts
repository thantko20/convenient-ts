type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type DotNestedKeys<T> = T extends object
  ? {
      [K in Exclude<keyof T, symbol>]: `${K}${"" | `.${DotNestedKeys<T[K]>}`}`;
    }[Exclude<keyof T, symbol>]
  : never;

type User = {
  name: string;
  preferences: {
    gender: string;
    sexuality: string;
  };
  age: number;
};

type UserKeys = DotNestedKeys<User>;

type UnDotToObj<
  Obj,
  Keys extends DotNestedKeys<Obj>
> = Keys extends `${infer First}.${infer Rest}`
  ? {
      [K in keyof Obj extends First ? First : never]: Obj[K];
    }
  : {
      [K in keyof Obj]: Obj[K];
    };

const test: UnDotToObj<User, "preferences.gender" | "age"> = {};

type Test = {
  user: {
    name: string;
  };
};

type OneKey = "user.name";

type Structured = OneKey extends `${infer User}.${infer Name}`
  ? {
      [K in keyof Test extends User ? "user" : never]: Test[K] extends object
        ? {
            [L in keyof Test[K] extends Name ? "name" : never]: Test[K][L];
          }
        : never;
    }
  : never;
