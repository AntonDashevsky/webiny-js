import { createEmailPatternValidator } from "./email.js";
import { createUrlPatternValidator } from "./url.js";
import { createLowerCasePatternValidator } from "./lowerCase.js";
import { createUpperCasePatternValidator } from "./upperCase.js";
import { createLowerCaseSpacePatternValidator } from "./lowerCaseSpace.js";
import { createUpperCaseSpacePatternValidator } from "./upperCaseSpace.js";
import { type CmsModelFieldPatternValidatorPlugin } from "~/types/index.js";

export const createPatternValidatorPlugins = (): CmsModelFieldPatternValidatorPlugin[] => {
    return [
        createEmailPatternValidator(),
        createUrlPatternValidator(),
        createLowerCasePatternValidator(),
        createUpperCasePatternValidator(),
        createLowerCaseSpacePatternValidator(),
        createUpperCaseSpacePatternValidator()
    ];
};
