
/**
 * TYPE-SAFE ERROR HANDLING
 * PRACTICE EXERCISES
 */

// ==========================================
// EXERCISE 1: CREATE A RESULT TYPE
// ==========================================

// Requirements:
// 1. Create a generic Result<T, E>.
// 2. Success must have ok: true and value.
// 3. Failure must have ok: false and error.

// TODO: Implement Result<T, E>


// ==========================================
// EXERCISE 2: DEFINE LOGIN ERRORS
// ==========================================

// Possible errors:
// invalid_email
// wrong_password
// account_locked

// TODO: Create LoginError union type


// ==========================================
// EXERCISE 3: BUILD LOGIN FUNCTION
// ==========================================

// Requirements:
// 1. Accept email and password.
// 2. Return a Result.
// 3. Return invalid_email for invalid email.
// 4. Return wrong_password for wrong password.
// 5. Return account_locked for a locked account.
// 6. Return a success message when valid.

// TODO: Implement loginUser()


// ==========================================
// EXERCISE 4: HANDLE LOGIN RESULT
// ==========================================

// Requirements:
// 1. Call loginUser().
// 2. Check result.ok.
// 3. Use switch to handle every error.
// 4. Print the success value.

// TODO: Implement processLogin()


// ==========================================
// EXERCISE 5: EXHAUSTIVE CHECKING
// ==========================================

// Requirements:
// 1. Create an assertNever function.
// 2. Use it in the default case.
// 3. Add a new error to LoginError.
// 4. Observe what happens if you forget its case.

// TODO: Implement exhaustive checking


// ==========================================
// EXERCISE 6: PAYMENT SERVICE
// ==========================================

// Define:
// Payment = {
//     transactionId: string;
//     amount: number;
// }

// Possible errors:
// invalid_amount
// insufficient_balance
// payment_failed

// Requirements:
// 1. Create a generic Result type.
// 2. Create a payment service.
// 3. Return explicit failure objects.
// 4. Return a success object.
// 5. Handle all errors with switch.

// TODO: Implement payment service


// ==========================================
// EXERCISE 7: TRY-CATCH VS RESULT
// ==========================================

// Create an async function that:
// 1. Uses Result for an expected business error.
// 2. Uses try-catch for an unexpected exception.
// 3. Handles both cases correctly.

// TODO: Implement your example
