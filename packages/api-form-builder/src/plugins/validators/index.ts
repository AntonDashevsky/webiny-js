import gte from "./gte.js";
import dateGte from "./dateTimeGte.js";
import inValidator from "./in.js";
import lte from "./lte.js";
import dateLte from "./dateTimeLte.js";
import maxLength from "./maxLength.js";
import minLength from "./minLength.js";
import pattern from "./pattern.js";
import required from "./required.js";
import patternPlugins from "./patternPlugins/index.js";

export default [
    gte,
    dateGte,
    inValidator,
    lte,
    dateLte,
    pattern,
    required,
    minLength,
    maxLength,
    patternPlugins
];
