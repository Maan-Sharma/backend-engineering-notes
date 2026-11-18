
# Type-Safe Error Handling – Common Mistakes

## 1. Returning Only the Success Type

### Incorrect

```typescript
async function chargeUser(): Promise<string> {
    throw new Error("Payment failed");
}
```

### Problem

The return type does not describe expected business failures.

### Correct

```typescript
async function chargeUser(): Promise<
    Result<string, ChargeError>
> {
    return {
        ok: false,
        error: "invalid_amount"
    };
}
```

---

## 2. Using Magic Error Messages

### Incorrect

```typescript
if (error.message === "User banned") {
    // Handle error
}
```

### Problem

String messages are fragile and can change unexpectedly.

### Correct

```typescript
type ChargeError =
    | "invalid_amount"
    | "user_banned"
    | "network_failure";
```

Use explicit error types.

---

## 3. Accessing Catch Errors Without Narrowing

### Incorrect

```typescript
try {
    // Some operation
} catch (error) {
    console.log(error.message);
}
```

### Problem

The error value is unknown and may not have a message property.

### Correct

```typescript
try {
    // Some operation
} catch (error: unknown) {

    if (error instanceof Error) {
        console.log(error.message);
    } else {
        console.log("Unknown error");
    }
}
```

---

## 4. Forgetting to Return a Failure Object

### Incorrect

```typescript
if (amount <= 0) {
    return;
}
```

### Problem

The function promises a Result but returns undefined.

### Correct

```typescript
if (amount <= 0) {
    return {
        ok: false,
        error: "invalid_amount"
    };
}
```

---

## 5. Accessing value Before Checking ok

### Incorrect

```typescript
console.log(result.value);
```

### Problem

The result may represent failure and contain error instead of value.

### Correct

```typescript
if (result.ok) {
    console.log(result.value);
} else {
    console.log(result.error);
}
```

---

## 6. Forgetting an Error Case

### Incorrect

```typescript
switch (result.error) {
    case "invalid_amount":
        return;

    case "user_banned":
        return;
}
```

### Problem

The network_failure case is missing.

### Correct

```typescript
function assertNever(value: never): never {
    throw new Error(`Unhandled: ${value}`);
}

switch (result.error) {
    case "invalid_amount":
        return;

    case "user_banned":
        return;

    case "network_failure":
        return;

    default:
        return assertNever(result.error);
}
```

---

## 7. Thinking Result Replaces try-catch

### Incorrect assumption

All errors should be returned using Result.

### Problem

Unexpected exceptions can still happen.

Examples:

- Database driver crashes
- Unexpected runtime errors
- File system exceptions
- Third-party library failures

### Correct approach

Use Result for expected business failures.

Use try-catch for unexpected exceptions and thrown errors.

---

## 8. Assuming Result Automatically Catches Exceptions

### Incorrect

```typescript
const result = await chargeUser("user_123", 50);
```

Assuming this call cannot throw just because it returns Result.

### Problem

The implementation or dependencies may still throw exceptions.

### Correct

Handle unexpected exceptions separately:

```typescript
try {
    const result = await chargeUser("user_123", 50);

    if (!result.ok) {
        console.log(result.error);
    }
} catch (error: unknown) {
    console.error("Unexpected failure", error);
}
```

---

# Final Lessons

- Use Result<T, E> to represent expected outcomes.
- Use discriminated unions for type narrowing.
- Define business errors explicitly.
- Use switch for handling different errors.
- Use never for exhaustive checking.
- Keep try-catch for unexpected exceptions.
- Do not assume TypeScript catches runtime failures.
