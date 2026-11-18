
# TypeScript Notes: Type-Safe Error Handling

## 1. What is Error Handling?

Error handling is the process of detecting, managing, and responding to problems that occur during program execution.

Examples:

- Invalid user input
- Incorrect password
- Insufficient account balance
- Network failure
- Database connection failure
- Payment failure

Good error handling makes applications predictable and reliable.

---

## 2. Traditional Error Handling: try-catch

JavaScript and TypeScript commonly use try-catch to handle errors.

Example:

```typescript
async function chargeUser(
    userId: string,
    amount: number
): Promise<string> {

    if (amount <= 0) {
        throw new Error("Invalid amount");
    }

    if (userId === "banned") {
        throw new Error("User banned");
    }

    return "receipt_123";
}
```

Calling the function:

```typescript
async function processCheckout() {
    try {
        const receipt = await chargeUser("banned", 50);

        console.log("Success:", receipt);
    } catch (error: unknown) {

        if (
            error instanceof Error &&
            error.message === "User banned"
        ) {
            console.log("Account is locked");
        } else {
            console.log("Generic failure");
        }
    }
}
```

### Problems with this approach

**Problem 1: Incomplete function signature**

The function promises:

```typescript
Promise<string>
```

But it can also throw errors.

Its return type does not describe all expected outcomes.

**Problem 2: Catch errors are unknown**

TypeScript treats catch variables as `unknown` by default.

We must narrow the type before accessing its properties.

**Problem 3: Magic strings**

Checking error messages such as:

```typescript
error.message === "User banned"
```

is fragile.

A spelling change can break application logic.

---

## 3. What is the Result Pattern?

The Result Pattern represents both success and failure as explicit return values.

Instead of throwing expected business errors, a function returns an object describing its outcome.

A generic Result type:

```typescript
type Result<T, E> =
    | {
        ok: true;
        value: T;
    }
    | {
        ok: false;
        error: E;
    };
```

### Understanding the properties

| Property | Meaning |
|---|---|
| T | Success value type |
| E | Error type |
| ok: true | Successful operation |
| ok: false | Failed operation |
| value | Successful result |
| error | Failure information |

Example:

```typescript
type PaymentResult = Result<string, string>;
```

Possible success:

```typescript
{
    ok: true,
    value: "receipt_123"
}
```

Possible failure:

```typescript
{
    ok: false,
    error: "Invalid amount"
}
```

---

## 4. Understanding Discriminated Unions

A discriminated union combines multiple object types using a common property.

In our Result type, that property is `ok`.

```typescript
type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };
```

TypeScript checks the value of `ok` to determine which object structure is available.

Example:

```typescript
function handleResult(
    result: Result<string, string>
) {
    if (result.ok) {
        console.log(result.value);
    } else {
        console.log(result.error);
    }
}
```

When `ok` is true, TypeScript knows `value` exists.

When `ok` is false, TypeScript knows `error` exists.

This is called type narrowing.

---

## 5. Define Explicit Business Errors

Instead of using arbitrary strings, define a union of allowed errors.

```typescript
type ChargeError =
    | "invalid_amount"
    | "user_banned"
    | "network_failure";
```

Now TypeScript only accepts these three error values.

Valid:

```typescript
const error: ChargeError = "user_banned";
```

Invalid:

```typescript
const error: ChargeError = "invalid_error";
```

The invalid value produces a compile-time error.

### Why use string literal unions?

- Prevent spelling mistakes.
- Define allowed business failures.
- Make function contracts clear.
- Improve autocomplete.
- Enable exhaustive checking.

---

## 6. Build a Type-Safe chargeUser Function

Define the function:

```typescript
async function chargeUser(
    userId: string,
    amount: number
): Promise<Result<string, ChargeError>> {

    if (amount <= 0) {
        return {
            ok: false,
            error: "invalid_amount"
        };
    }

    if (userId === "banned") {
        return {
            ok: false,
            error: "user_banned"
        };
    }

    return {
        ok: true,
        value: "receipt_123"
    };
}
```

### Understanding the return type

```typescript
Promise<Result<string, ChargeError>>
```

This means:

1. The function is asynchronous.
2. It returns a Promise.
3. The Promise resolves to a Result.
4. Success contains a string.
5. Failure contains a ChargeError.

The function signature now describes both expected outcomes.

---

## 7. Handling Errors with a Switch Statement

Call the function:

```typescript
async function processCheckout() {
    const result = await chargeUser("banned", 50);

    if (!result.ok) {
        switch (result.error) {

            case "invalid_amount":
                console.log("Please check your input");
                return;

            case "user_banned":
                console.log("Contact support");
                return;

            case "network_failure":
                console.log("Retrying payment");
                return;
        }
    }

    console.log("Payment successful:", result.value);
}
```

### Why does this work?

When `result.ok` is false, TypeScript knows that `result.error` exists.

When the failure block is skipped, TypeScript knows that `result.value` exists.

No unsafe type assertions are required.

---

## 8. Exhaustive Error Checking with never

The `never` type represents a value that should never occur.

It is useful for checking whether all possible union cases have been handled.

Example:

```typescript
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
```

Use it in the switch:

```typescript
async function processCheckout() {
    const result = await chargeUser("user_123", 50);

    if (!result.ok) {
        switch (result.error) {

            case "invalid_amount":
                console.log("Invalid amount");
                return;

            case "user_banned":
                console.log("User banned");
                return;

            case "network_failure":
                console.log("Network failure");
                return;

            default:
                return assertNever(result.error);
        }
    }

    console.log(result.value);
}
```

### Why is never important?

Imagine we later add:

```typescript
type ChargeError =
    | "invalid_amount"
    | "user_banned"
    | "network_failure"
    | "insufficient_balance";
```

If we forget to handle `insufficient_balance`, TypeScript reports an error at `assertNever`.

This prevents newly introduced error cases from being silently ignored.

---

## 9. Result Pattern vs try-catch

| Result Pattern | try-catch |
|---|---|
| Expected errors | Unexpected exceptions |
| Errors are returned | Errors are thrown |
| Explicit return contract | Errors not shown in return type |
| Type-safe error unions | Catch variable is unknown |
| Easy exhaustive checking | Requires manual narrowing |

### Important

The Result Pattern does not replace try-catch.

Use Result for expected business failures.

Use try-catch for unexpected exceptions and operations that may throw.

Examples:

**Result pattern:**
- Invalid amount
- Banned account
- Insufficient balance
- Invalid credentials

**try-catch:**
- Unexpected database driver exception
- File system failure
- Unexpected third-party library exception
- Unexpected runtime exception

---

## 10. Real Backend Application

Consider a payment API.

The service validates the request and returns a Result.

```typescript
type PaymentError =
    | "invalid_amount"
    | "insufficient_balance"
    | "user_banned";

type Payment = {
    transactionId: string;
    amount: number;
};

async function processPayment(
    userId: string,
    amount: number
): Promise<Result<Payment, PaymentError>> {

    if (amount <= 0) {
        return {
            ok: false,
            error: "invalid_amount"
        };
    }

    if (userId === "banned") {
        return {
            ok: false,
            error: "user_banned"
        };
    }

    return {
        ok: true,
        value: {
            transactionId: "txn_123",
            amount
        }
    };
}
```

In a real application, the service might also check account balance and call a payment provider.

A Result type makes expected business failures explicit.

Important: A Result type does not automatically catch exceptions thrown by database or payment-provider calls. Those still need appropriate exception handling.

---

## 11. Key Concepts to Remember

| Concept | Meaning |
|---|---|
| try-catch | Handles thrown exceptions |
| Result<T, E> | Represents success or failure |
| T | Success type |
| E | Error type |
| Discriminated union | Union identified by a common property |
| Type narrowing | Restricting a type based on checks |
| String literal union | Restricts values to predefined strings |
| never | Helps ensure exhaustive handling |
| Promise | Represents an asynchronous operation |

---

## 12. Interview Questions

1. What is the Result Pattern?
2. Why is `Promise<string>` an incomplete contract if a function throws expected errors?
3. What is a discriminated union?
4. Why use `Result<T, E>` instead of throwing business errors?
5. Why is the catch variable typed as unknown?
6. What is the purpose of the never type?
7. How does exhaustive checking work?
8. Does Result replace try-catch?
9. What is the difference between a business error and a system exception?
10. How would you implement Result-based error handling in a payment service?

---

## Quick Revision

```typescript
type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };

type ChargeError =
    | "invalid_amount"
    | "user_banned"
    | "network_failure";

async function chargeUser(
    userId: string,
    amount: number
): Promise<Result<string, ChargeError>> {

    if (amount <= 0) {
        return {
            ok: false,
            error: "invalid_amount"
        };
    }

    if (userId === "banned") {
        return {
            ok: false,
            error: "user_banned"
        };
    }

    return {
        ok: true,
        value: "receipt_123"
    };
}
```

Remember:

**Result Pattern = Explicit Success + Explicit Failure + Compile-Time Type Safety.**
