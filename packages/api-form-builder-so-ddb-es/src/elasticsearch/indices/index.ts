import { base } from "./base.js";
import { japanese } from "./japanese.js";

export const elasticsearchIndexPlugins = () => {
    return [base, japanese];
};
