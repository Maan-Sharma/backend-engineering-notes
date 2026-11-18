
# Generic Repository Pattern – TypeScript

## 1. What is a Generic Repository?

The Generic Repository Pattern is a software design pattern that provides reusable data access operations for different entity types.

Instead of creating separate repository classes for users, products, and orders, we create one generic repository.

Example:

- UserRepository
- ProductRepository
- OrderRepository

All can use the same generic repository implementation.

### Benefits

- Code reusability
- Type safety
- Less duplication
- Easier maintenance
- Consistent database operations

---

## 2. Understanding Generics

Generics allow us to create reusable components that work with different data types.

Example:

```typescript
function identity<T>(value: T): T {
    return value;
}

identity<string>("Hello");
identity<number>(100);
identity<boolean>(true);
```

Here, `T` represents a type that is determined when the function is used.

### Important

`T` does not automatically have any properties.

It can represent a string, number, boolean, or object.

---

## 3. The Problem with Unrestricted Generics

Consider this repository:

```typescript
class DatabaseRepository<T> {
    private db = new Map<string, T>();

    save(item: T): void {
        const id = item.id;
    }
}
```

TypeScript produces an error:

```text
Property 'id' does not exist on type 'T'.
```

### Why?

Because TypeScript does not know whether `T` contains an `id` property.

For example:

```typescript
DatabaseRepository<string>;
DatabaseRepository<number>;
DatabaseRepository<boolean>;
```

All these types are possible without a constraint.

Therefore, accessing `item.id` is unsafe.

---

## 4. Why `any` Is Not a Good Solution

We might try:

```typescript
const id = (item as any).id;
```

This suppresses the compiler error.

But it also removes type safety.

For example:

```typescript
const repo = new DatabaseRepository<{
    event: string;
    count: number;
}>();

repo.save({
    event: "page_view",
    count: 1
});
```

The object does not contain an ID.

The application may store the entity using an undefined key.

### Lesson

Avoid using `any` just to silence TypeScript errors.

Use generic constraints to describe the actual requirements.

---

## 5. Generic Constraints

A generic constraint restricts which types can be passed to a generic function or class.

First, define a required structure:

```typescript
type HasId = {
    id: string;
};
```

Now use `extends`:

```typescript
class DatabaseRepository<T extends HasId> {
    private db = new Map<string, T>();

    save(item: T): void {
        const id = item.id;

        this.db.set(id, item);
    }
}
```

### Understanding `T extends HasId`

It means:

- T must contain an `id` property.
- The ID must be a string.
- T can contain additional properties.
- Types without the required ID are rejected.

Important: Here, `extends` is a generic constraint, not class inheritance.

---

## 6. Creating a Valid Entity

Define an AnalyticsEvent:

```typescript
type AnalyticsEvent = {
    id: string;
    event: string;
    count: number;
};
```

Create the repository:

```typescript
const analyticsRepo =
    new DatabaseRepository<AnalyticsEvent>();
```

Save an event:

```typescript
analyticsRepo.save({
    id: "evt_999",
    event: "page_view",
    count: 1
});
```

The compiler checks that all required properties exist.

This invalid object will be rejected:

```typescript
analyticsRepo.save({
    event: "page_view",
    count: 1
});
```

It is missing the required `id`.

---

## 7. Complete Repository Operations

A repository can provide multiple operations:

| Method | Purpose |
|---|---|
| save() | Store an entity |
| findById() | Find an entity by ID |
| getAll() | Return all entities |
| update() | Update an existing entity |
| delete() | Remove an entity |

Example:

```typescript
class DatabaseRepository<T extends HasId> {
    private db = new Map<string, T>();

    save(item: T): void {
        this.db.set(item.id, item);
    }

    findById(id: string): T | undefined {
        return this.db.get(id);
    }

    getAll(): T[] {
        return Array.from(this.db.values());
    }

    update(id: string, item: T): boolean {
        if (!this.db.has(id)) {
            return false;
        }

        if (item.id !== id) {
            throw new Error("Entity ID mismatch");
        }

        this.db.set(id, item);
        return true;
    }

    delete(id: string): boolean {
        return this.db.delete(id);
    }
}
```

---

## 8. Real Backend Applications

Generic repositories are useful when multiple entities share common data access requirements.

Examples:

### User Repository

```typescript
type User = {
    id: string;
    name: string;
    email: string;
};
```

### Product Repository

```typescript
type Product = {
    id: string;
    name: string;
    price: number;
};
```

### Order Repository

```typescript
type Order = {
    id: string;
    customerId: string;
    total: number;
};
```

All three satisfy the `HasId` constraint.

---

## 9. Compile-Time vs Runtime Validation

TypeScript checks declared types during compilation.

It does not automatically validate external data received through:

- HTTP requests
- JSON files
- Database records
- Third-party APIs

For external data, use runtime validation libraries such as Zod.

Example:

```typescript
import { z } from "zod";

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email()
});

const result = UserSchema.safeParse(requestBody);

if (!result.success) {
    throw new Error("Invalid user data");
}
```

---

## 10. Important Interview Concepts

1. What are TypeScript generics?
2. What is a generic constraint?
3. What does `T extends HasId` mean?
4. Why can't unrestricted generic types access specific properties?
5. Why is `any` dangerous?
6. What is the Generic Repository Pattern?
7. What is the difference between compile-time and runtime validation?
8. Why use repositories in backend architecture?

---

## Quick Revision

```typescript
type HasId = {
    id: string;
};

class Repository<T extends HasId> {
    private db = new Map<string, T>();

    save(item: T): void {
        this.db.set(item.id, item);
    }
}
```

Remember:

A generic constraint ensures that a generic type satisfies a required structure.

This allows reusable code without sacrificing type safety.
