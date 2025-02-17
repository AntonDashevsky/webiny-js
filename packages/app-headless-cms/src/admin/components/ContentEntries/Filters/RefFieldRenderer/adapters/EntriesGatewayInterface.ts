import { EntryReference } from "../domain/index.js";

export interface EntriesGatewayInterface {
    list: (modelIds: string[], query: string) => Promise<EntryReference[]>;
    get: (modelId: string, id: string) => Promise<EntryReference>;
}
