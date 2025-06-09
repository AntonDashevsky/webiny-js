import { type CmsModelFieldPatternValidatorPlugin } from "~/types/index.js";

export const createLowerCaseSpacePatternValidator = (): CmsModelFieldPatternValidatorPlugin => {
    return {
        type: "cms-model-field-validator-pattern",
        name: "cms-model-field-validator-pattern-lower-case-space",
        pattern: {
            name: "lowerCaseSpace",
            regex: `^([a-z\\s]+)$`,
            flags: ""
        }
    };
};
