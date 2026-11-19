
# NoInfer Utility Type – TypeScript

Learn how to control generic type inference using the built-in `NoInfer<T>` utility type introduced in TypeScript 5.4.

## Learning objectives

- Understand generic type inference.
- Understand why TypeScript infers types from multiple function arguments.
- Learn what `NoInfer<T>` does.
- Control which argument determines a generic type.
- Prevent invalid values from expanding inferred unions.
- Build type-safe deployment and configuration functions.

## Files

| File | Purpose |
|---|---|
| notes.md | Detailed explanations |
| examples.ts | Complete TypeScript examples |
| exercises.ts | Practical exercises |
| mistakes.md | Common mistakes and solutions |

## Core concept

```typescript
function deploy<T extends string>(
    allowedRegions: T[],
    targetRegion: NoInfer<T>
): void {
    console.log(targetRegion);
}
```

`NoInfer<T>` tells TypeScript not to use that parameter as a source for inferring T.

## Real-world applications

- Cloud deployment regions
- Feature flag configuration
- Allowed user roles
- API version selection
- Supported payment methods
- Environment configuration

## Progress

- [x] Understand generic inference
- [x] Understand the inference problem
- [x] Learn NoInfer<T>
- [x] Build a type-safe deployment function
- [ ] Complete exercises
- [ ] Apply NoInfer to a backend configuration
