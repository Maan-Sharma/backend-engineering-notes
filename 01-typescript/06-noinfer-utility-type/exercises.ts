
/**
 * NOINFER<T> PRACTICE EXERCISES
 */

// ==========================================
// EXERCISE 1: UNDERSTAND INFERENCE
// ==========================================

// Create a generic function that accepts
// an array of values and one selected value.

// Without NoInfer, test whether both arguments
// can contribute to generic inference.

// TODO: Implement choose()


// ==========================================
// EXERCISE 2: USE NOINFER
// ==========================================

// Modify your choose() function.

// Requirements:
// 1. First argument determines T.
// 2. Second argument uses NoInfer<T>.
// 3. Invalid values should produce compile errors.

// TODO: Implement chooseStrict()


// ==========================================
// EXERCISE 3: CLOUD REGIONS
// ==========================================

// Create an array containing:
// us-east-1
// eu-west-1
// ap-south-1

// Create a deploy() function.

// Requirements:
// 1. Accept allowed regions.
// 2. Accept one target region.
// 3. Use NoInfer<T>.
// 4. Return a deployment message.

// TODO: Implement deploy()


// ==========================================
// EXERCISE 4: FEATURE FLAGS
// ==========================================

// Allowed features:
// dark_mode
// notifications
// analytics

// Create enableFeature().

// Invalid feature names must be rejected.

// TODO: Implement enableFeature()


// ==========================================
// EXERCISE 5: USER ROLES
// ==========================================

// Allowed roles:
// admin
// editor
// viewer

// Create assignRole().

// Use NoInfer<T> for the selected role.

// TODO: Implement assignRole()


// ==========================================
// EXERCISE 6: RESULT TYPE
// ==========================================

// Create a generic Result<T, E>.

// Success:
// { ok: true, value: T }

// Failure:
// { ok: false, error: E }

// Use it in your deployment function.

// TODO: Implement Result<T, E>


// ==========================================
// EXERCISE 7: REAL BACKEND SCENARIO
// ==========================================

// Create an API version selector.

// Allowed versions:
// v1
// v2
// v3

// Requirements:
// 1. Define supported versions.
// 2. Accept a requested version.
// 3. Use NoInfer<T>.
// 4. Return a Result.
// 5. Handle unsupported versions.

// TODO: Implement selectApiVersion()
