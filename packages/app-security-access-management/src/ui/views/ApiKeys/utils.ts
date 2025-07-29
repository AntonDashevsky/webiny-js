import pick from "lodash/pick";
import type { ApiKey } from "~/types";

export const pickDataForAPI = (
    data: ApiKey
): Pick<ApiKey, "name" | "description" | "permissions"> => ({
    ...pick(data, ["name", "description", "permissions"])
});
