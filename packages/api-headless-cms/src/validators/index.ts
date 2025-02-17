import { createGteValidator } from "./gte.js";
import { createInValidator } from "./in.js";
import { createLteValidator } from "./lte.js";
import { createMaxLengthValidator } from "./maxLength.js";
import { createMinLengthValidator } from "./minLength.js";
import { createPatternValidator } from "./pattern.js";
import { createRequiredValidator } from "./required.js";
import { createPatternValidatorPlugins } from "./patternPlugins/index.js";
import { createDateLteValidator } from "./dateLte.js";
import { createDateGteValidator } from "./dateGte.js";
import { createTimeLteValidator } from "./timeLte.js";
import { createTimeGteValidator } from "./timeGte.js";
import { createUniqueValidator } from "./unique.js";

export const createValidators = () => [
    createGteValidator(),
    createInValidator(),
    createLteValidator(),
    createMaxLengthValidator(),
    createMinLengthValidator(),
    createPatternValidator(),
    createRequiredValidator(),
    createPatternValidatorPlugins(),
    createDateLteValidator(),
    createDateGteValidator(),
    createTimeLteValidator(),
    createTimeGteValidator(),
    createUniqueValidator()
];
