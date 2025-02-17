import { Sorting } from "~/fta/Domain/Models/index.js";

export interface ISortingRepository {
    set: (sorts: Sorting[]) => void;
    get: () => Sorting[];
}
