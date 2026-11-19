
# NoInfer<T> – Common Mistakes

## 1. Thinking NoInfer Prevents All Inference

### Incorrect understanding

NoInfer<T> stops TypeScript from inferring T completely.

### Correct understanding

It stops a particular type position from contributing inference candidates for T.

Other eligible parameters can still determine T.

---

## 2. Using Normal Generic Inference When One Source Should Control T

### Incorrect

```typescript
function deploy<T extends string>(
    allowed: T[],
    target: T
) {
    return target;
}
```

### Problem

Both parameters can contribute to inference.

An invalid target may expand the inferred union.

### Correct

```typescript
function deploy<T extends string>(
    allowed: T[],
    target: NoInfer<T>
) {
    return target;
}
```

---

## 3. Forgetting as const

### Example

```typescript
const regions = [
    "us-east-1",
    "eu-west-1"
];
```

The inferred type is generally `string[]`.

This means T can become the broad type `string`.

### Better

```typescript
const regions = [
    "us-east-1",
    "eu-west-1"
] as const;
```

Now the array is a readonly tuple containing literal types.

---

## 4. Assuming NoInfer Performs Runtime Validation

### Incorrect assumption

NoInfer prevents invalid values from entering the application.

### Problem

TypeScript types do not exist at runtime.

External API input can still contain invalid values.

### Correct

Use runtime validation for untrusted input.

For example, use Zod or explicit checks.

---

## 5. Forgetting TypeScript Version

NoInfer<T> was introduced in TypeScript 5.4.

Older TypeScript versions may not recognize it.

Check your version:

```bash
npx tsc --version
```

Upgrade if necessary:

```bash
npm install -D typescript@latest
```

---

## 6. Confusing NoInfer with a Runtime Function

NoInfer is a type-level utility.

It does not execute JavaScript code.

It does not change the runtime behavior of a function.

---

## 7. Using NoInfer Without a Clear Reason

NoInfer is useful when one argument should determine the generic type and other arguments should only be checked against it.

Do not add it everywhere.

---

# Final Lessons

- Understand generic inference first.
- Use NoInfer<T> to control inference sources.
- Use as const to preserve literal types.
- Use NoInfer for configuration and allowed-value APIs.
- Use runtime validation for external data.
- Check TypeScript 5.4 or later.
