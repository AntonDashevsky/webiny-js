import { IndexManager } from "~/settings/index.js";

export const createIndexFactory = (manager: IndexManager) => {
    return {
        create: async (index: string, settings?: Record<string, any>): Promise<void> => {
            return manager.createIndex(index, settings);
        },
        createIfNotExists: async (index: string, settings?: Record<string, any>): Promise<void> => {
            try {
                const exists = await manager.indexExists(index);
                if (exists) {
                    return;
                }
            } catch (ex) {
                return;
            }

            return await manager.createIndex(index, settings);
        }
    };
};
