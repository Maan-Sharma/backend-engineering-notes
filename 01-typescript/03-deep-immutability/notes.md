# Deep Immutability & Configuration Management

## 1. Immutability

Immutability means preventing an object's state from being changed after creation.

`const` prevents reassignment of a variable. It does not prevent mutation of the object referenced by that variable.

```ts
const user = { name: "Man", age: 23 };

user.age = 24; // Allowed

// user = { name: "Developer", age: 25 };
// Error: cannot reassign a const variable
```

## 2. Why protect configuration?

Backend configuration may contain API endpoints, retry limits, database settings, authentication options and feature flags. Accidental mutation can make application behaviour unpredictable.

## 3. Readonly<T> is shallow

```ts
type AppConfig = {
  API: {
    endpoint: string;
    retries: number;
  };
  activeFeatures: string[];
};

const config: Readonly<AppConfig> = {
  API: { endpoint: "https://api.v1", retries: 3 },
  activeFeatures: ["NewDashboard"]
};

// Error: top-level property is readonly
// config.API = { endpoint: "https://api.v2", retries: 5 };

// Allowed: nested object is still mutable
config.API.retries = 0;

// Allowed: array is still mutable
config.activeFeatures.push("AdminBypass");
```

`Readonly<T>` protects only the first level.

## 4. Mapped types and keyof

A mapped type iterates over keys of an existing type and creates a new type.

```ts
type ReadonlyShape<T> = {
  readonly [K in keyof T]: T[K];
};
```

- `keyof T` produces the keys of `T`.
- `K in keyof T` iterates through those keys.
- `T[K]` retrieves the type of a property.

## 5. Conditional types

A conditional type selects a type based on a condition.

```ts
type Label<T> = T extends string ? "Text" : "Not text";

type A = Label<string>; // "Text"
type B = Label<number>; // "Not text"
```

## 6. Recursive DeepReadonly<T>

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]:
    T[P] extends object
      ? DeepReadonly<T[P]>
      : T[P];
};
```

This teaching implementation recursively makes properties readonly. Arrays are objects in TypeScript's type system, so mapped recursion also makes their elements readonly and removes mutating methods such as `push()` from the resulting type.

A function-preserving variant is:

```ts
type DeepReadonly<T> =
  T extends (...args: any[]) => any
    ? T
    : T extends object
      ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
      : T;
```

For complex types, add special handling for `Date`, `Map`, `Set`, class instances and other built-ins. The generic mapped type alone does not make Map/Set mutation methods immutable.

## 7. as const

`as const` is useful for static inline data. It preserves literal types, makes object properties readonly recursively, and turns arrays into readonly tuples.

```ts
const routes = {
  home: "/",
  profile: "/profile"
} as const;

// routes.home = "/start"; // Error
```

## 8. Compile-time versus runtime

TypeScript readonly restrictions are compile-time checks. They do not automatically freeze JavaScript objects at runtime.

`Object.freeze(value)` freezes one object shallowly. Nested objects need recursive freezing.

```ts
function deepFreeze<T>(
  value: T,
  seen = new WeakSet<object>()
): T {
  if (
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return value;
  }

  const obj = value as object;
  if (seen.has(obj)) return value;
  seen.add(obj);

  for (const key of Reflect.ownKeys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor && "value" in descriptor) {
      deepFreeze(descriptor.value, seen);
    }
  }

  return Object.freeze(obj);
}
```

This is intended for plain objects and arrays. Freezing a `Map` or `Set` does not stop its methods from changing entries; those need special handling.

## 9. Production configuration workflow

1. Read environment variables.
2. Validate required values and formats (for example with Zod).
3. Construct a typed configuration object.
4. Apply compile-time readonly types.
5. Freeze plain objects/arrays at runtime if appropriate.
6. Let services read configuration.

Never expose server secrets to frontend code. Read secrets from deployment environment variables or a secret manager.

## 10. Quick comparison

| Tool | Protection |
|---|---|
| `const` | Variable reassignment |
| `Readonly<T>` | Top-level properties at compile time |
| `DeepReadonly<T>` | Nested properties at compile time |
| `as const` | Literal types and readonly structure at compile time |
| `Object.freeze()` | Shallow runtime freeze |
| `deepFreeze()` | Recursive runtime freezing for supported structures |

## Key pattern

**Generic + Mapped Type + Conditional Type + Recursion = DeepReadonly<T>**
