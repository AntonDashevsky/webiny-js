import { CmsModelFieldPatternValidatorPlugin } from "~/types/index.js";

export const createUpperCaseSpacePatternValidator = (): CmsModelFieldPatternValidatorPlugin => {
    return {
        type: "cms-model-field-validator-pattern",
        name: "cms-model-field-validator-pattern-upper-case-space",
        pattern: {
            name: "upperCaseSpace",
            regex: `^([A-Z\\s]+)$`,
            flags: ""
        }
    };
};
