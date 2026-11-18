
# Generic Repository Pattern

Learn how to build reusable and type-safe repositories using TypeScript generics and generic constraints.

## Learning objectives

- Understand generic types (`T`).
- Understand generic constraints (`extends`).
- Learn why unrestricted generics cannot access specific properties.
- Avoid unsafe type assertions such as `as any`.
- Build a reusable generic repository.
- Understand how repositories are used in backend applications.

## Files

| File | Purpose |
|---|---|
| `notes.md` | Detailed explanations and concepts |
| `examples.ts` | Complete TypeScript implementation |
| `exercises.ts` | Hands-on coding practice |
| `mistakes.md` | Common mistakes and solutions |

## Core concept

```typescript
type HasId = {
    id: string;
};

class DatabaseRepository<T extends HasId> {
    private db = new Map<string, T>();

    save(item: T): void {
        this.db.set(item.id, item);
    }
}
```

The constraint `T extends HasId` ensures every entity has a string ID.

## Real-world applications

- User repositories
- Product repositories
- Order repositories
- Analytics repositories
- Database abstraction layers

## Status

- [x] Understand generic constraints
- [x] Build a generic repository
- [ ] Complete practice exercises
- [ ] Implement update and delete operations
- [ ] Explore integration with PostgreSQL
