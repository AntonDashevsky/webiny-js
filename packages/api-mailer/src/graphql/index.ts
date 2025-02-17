import { createSettingsGraphQL } from "~/graphql/settings.js";

export const createGraphQL = () => {
    return [createSettingsGraphQL()];
};
