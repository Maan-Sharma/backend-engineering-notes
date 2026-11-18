
/**
 * GENERIC REPOSITORY PRACTICE
 *
 * Try solving each exercise before checking examples.ts.
 */

// ------------------------------------
// EXERCISE 1: Create a Product Type
// ------------------------------------

// Requirements:
// id: string
// name: string
// price: number

type Product = {
    // TODO: Add properties
};

// ------------------------------------
// EXERCISE 2: Create an Order Type
// ------------------------------------

// Requirements:
// id: string
// customerId: string
// total: number

type Order = {
    // TODO: Add properties
};

// ------------------------------------
// EXERCISE 3: Create a Generic Repository
// ------------------------------------

// Requirements:
// 1. Create a HasId type.
// 2. Create DatabaseRepository<T extends HasId>.
// 3. Add a private Map.
// 4. Implement save().
// 5. Implement findById().

type HasId = {
    // TODO: Add required ID
};

class DatabaseRepository<T extends HasId> {
    // TODO: Implement repository
}

// ------------------------------------
// EXERCISE 4: Add Update Method
// ------------------------------------

// Requirements:
// 1. Accept an ID.
// 2. Accept an updated entity.
// 3. Check whether the ID exists.
// 4. Update the entity.
// 5. Return true or false.

// TODO: Implement update()

// ------------------------------------
// EXERCISE 5: Add Delete Method
// ------------------------------------

// Requirements:
// 1. Accept an ID.
// 2. Remove the entity.
// 3. Return whether deletion succeeded.

// TODO: Implement delete()

// ------------------------------------
// EXERCISE 6: Test Type Safety
// ------------------------------------

// Try creating a type without an ID.

// Why does this fail when used with
// DatabaseRepository<T extends HasId>?

type InvalidEntity = {
    name: string;
};

// TODO: Try using InvalidEntity with your repository.

// ------------------------------------
// EXERCISE 7: Real Backend Scenario
// ------------------------------------

// Create a User type containing:
// id, name, email, role.

// Create a user repository.

// Save two users.

// Find one user by ID.

// Delete one user.

// TODO: Implement the complete example.
