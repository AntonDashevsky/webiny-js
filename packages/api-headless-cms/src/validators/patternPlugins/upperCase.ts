import type { CmsModelFieldPatternValidatorPlugin } from "~/types/index.js";

export const createUpperCasePatternValidator = (): CmsModelFieldPatternValidatorPlugin => {
    return {
        type: "cms-model-field-validator-pattern",
        name: "cms-model-field-validator-pattern-upper-case",
        pattern: {
            name: "upperCase",
            regex: `^([A-Z]*)$`,
            flags: ""
        }
    };
};
