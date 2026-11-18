# Deep Immutability & Configuration Management

**Level:** Intermediate to Advanced  
**Status:** Learning / Practice

## Files

- [Notes](./notes.md)
- [Code examples](./examples.ts)
- [Exercises](./exercises.ts)
- [Mistakes and lessons](./mistakes.md)

## Learning objectives

- Explain `const` versus `readonly`.
- Understand why `Readonly<T>` is shallow.
- Build a recursive `DeepReadonly<T>` utility.
- Understand mapped types, `keyof`, conditional types and recursion.
- Use `as const` for static literal data.
- Distinguish compile-time readonly types from runtime freezing.

## Revision checklist

- [ ] Explain the concept without looking at notes.
- [ ] Recreate `DeepReadonly<T>` from memory.
- [ ] Explain why arrays become readonly.
- [ ] Complete the exercises.
- [ ] Explain runtime limitations of `Object.freeze()`.
