
# Generic Repository – Common Mistakes

## 1. Accessing Properties Without Constraints

### Incorrect

    ```typescript
class Repository<T> {
    save(item: T) {
        console.log(item.id);
    }
}
```

### Problem

TypeScript does not know whether T has an ID.

### Correct

    ```typescript
type HasId = {
    id: string;
};

class Repository<T extends HasId> {
    save(item: T) {
        console.log(item.id);
    }
}
```

---

## 2. Using `any` to Silence Errors

### Incorrect

    ```typescript
const id = (item as any).id;
```

### Problem

This bypasses type checking and can introduce runtime errors.

### Correct

    ```typescript
const id = item.id;
```

Use a generic constraint to guarantee that the property exists.

---

## 3. Confusing Generic Constraints with Inheritance

### Incorrect understanding

`T extends HasId` means T must inherit from a HasId class.

### Correct understanding

It means T must satisfy the structure described by HasId.

---

## 4. Forgetting the Required ID

### Incorrect

    ```typescript
type Product = {
    name: string;
    price: number;
};
```

### Problem

Product does not satisfy the HasId constraint.

### Correct

    ```typescript
type Product = {
    id: string;
    name: string;
    price: number;
};
```

---

## 5. Assuming TypeScript Validates API Data

### Incorrect assumption

If an API request is typed as User, its data must be a valid User.

### Problem

TypeScript types are removed during compilation.

External JSON data is not automatically validated.

### Correct

Use runtime validation with Zod or another validation library.

---

## 6. Ignoring Missing Database Records

### Incorrect

    ```typescript
const user = repo.findById("user_1");

console.log(user.name);
```

### Problem

The user might not exist.findById() returns User or undefined.

### Correct

    ```typescript
const user = repo.findById("user_1");

if (user) {
    console.log(user.name);
}
```

---

## 7. Assuming an In - Memory Map Is a Production Database

### Problem

A Map stores data in application memory.

Its contents disappear when the process stops.

### Correct understanding

Use a real database such as PostgreSQL for persistent storage.

The repository pattern can provide an abstraction over that database.

---

# Final Lessons

    - Use generics for reusable code.
- Use constraints to enforce required properties.
- Avoid unnecessary`any`.
- Handle missing records.
- Validate external data at runtime.
- Understand the difference between an in -memory example and production persistence.
