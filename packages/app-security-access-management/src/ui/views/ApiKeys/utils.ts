import pick from "lodash/pick.js";
import { type ApiKey } from "~/types.js";

export const pickDataForAPI = (
    data: ApiKey
): Pick<ApiKey, "name" | "description" | "permissions"> => ({
    ...pick(data, ["name", "description", "permissions"])
});
