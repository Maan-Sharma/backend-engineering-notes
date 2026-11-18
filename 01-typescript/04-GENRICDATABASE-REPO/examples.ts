
/**
 * GENERIC REPOSITORY PATTERN
 * Demonstrates generic constraints and reusable repositories.
 */

// 1. Define the required structure
type HasId = {
    id: string;
};

// 2. Create a generic repository
class DatabaseRepository<T extends HasId> {
    private db = new Map<string, T>();

    // Save entity
    save(item: T): void {
        this.db.set(item.id, item);

        console.log(`Saved entity: ${item.id}`);
    }

    // Find entity
    findById(id: string): T | undefined {
        return this.db.get(id);
    }

    // Get all entities
    getAll(): T[] {
        return Array.from(this.db.values());
    }

    // Update entity
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

    // Delete entity
    delete(id: string): boolean {
        return this.db.delete(id);
    }
}

// 3. Define Analytics Event
type AnalyticsEvent = {
    id: string;
    event: string;
    count: number;
};

// 4. Define Product
type Product = {
    id: string;
    name: string;
    price: number;
};

// 5. Create repositories
const analyticsRepo =
    new DatabaseRepository<AnalyticsEvent>();

const productRepo =
    new DatabaseRepository<Product>();

// 6. Save analytics event
analyticsRepo.save({
    id: "evt_999",
    event: "page_view",
    count: 1
});

// 7. Save product
productRepo.save({
    id: "prod_101",
    name: "Keyboard",
    price: 2500
});

// 8. Find entity
const event = analyticsRepo.findById("evt_999");

console.log("Found event:", event);

// 9. Get all products
console.log("Products:", productRepo.getAll());

// 10. Update product
productRepo.update("prod_101", {
    id: "prod_101",
    name: "Mechanical Keyboard",
    price: 3500
});

// 11. Delete product
productRepo.delete("prod_101");
