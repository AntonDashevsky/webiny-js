import { DocumentStore } from "./DocumentStore";

class DocumentStoreManager {
    private stores = new Map<string, DocumentStore>();

    getStores() {
        return this.stores;
    }

    getStore(id: string): DocumentStore {
        if (!this.stores.has(id)) {
            this.stores.set(id, new DocumentStore());
        }
        return this.stores.get(id)!;
    }

    removeStore(id: string) {
        this.stores.delete(id);
    }

    hasStore(id: string): boolean {
        return this.stores.has(id);
    }
}

export const documentStoreManager = new DocumentStoreManager();
