
/**
 * TYPE-SAFE ERROR HANDLING
 * Generic Result Pattern + Discriminated Unions
 */

// ==========================================
// 1. GENERIC RESULT TYPE
// ==========================================

type Result<T, E> =
    | {
        ok: true;
        value: T;
    }
    | {
        ok: false;
        error: E;
    };

// ==========================================
// 2. DEFINE BUSINESS ERRORS
// ==========================================

type ChargeError =
    | "invalid_amount"
    | "user_banned"
    | "network_failure";

// ==========================================
// 3. CHARGE USER
// ==========================================

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

    // Example success receipt
    return {
        ok: true,
        value: "receipt_123"
    };
}

// ==========================================
// 4. EXHAUSTIVE CHECKING
// ==========================================

function assertNever(value: never): never {
    throw new Error(`Unhandled error: ${value}`);
}

// ==========================================
// 5. PROCESS CHECKOUT
// ==========================================

async function processCheckout(
    userId: string,
    amount: number
): Promise<void> {

    const result = await chargeUser(userId, amount);

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

            default:
                return assertNever(result.error);
        }
    }

    console.log("Payment successful:", result.value);
}

// ==========================================
// 6. TEST DIFFERENT SCENARIOS
// ==========================================

async function main() {

    console.log("Test 1: Successful payment");

    await processCheckout("user_123", 50);

    console.log("Test 2: Invalid amount");

    await processCheckout("user_123", -10);

    console.log("Test 3: Banned user");

    await processCheckout("banned", 50);
}

main().catch((error: unknown) => {
    console.error("Unexpected system failure:", error);
});
