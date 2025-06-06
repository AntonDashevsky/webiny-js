import { createDefaultFilterCreate } from "./defaultFilterCreate";
import { createRefFilterCreate } from "./refFilterCreate";
import { objectFilterCreate } from "./objectFilterCreate";
import { searchableJsonFilterCreate } from "./searchableJsonFilterCreate";

export const createFilterCreatePlugins = () => {
    return [
        createDefaultFilterCreate(),
        createRefFilterCreate(),
        objectFilterCreate(),
        searchableJsonFilterCreate()
    ];
};
