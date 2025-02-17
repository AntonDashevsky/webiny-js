import { HANDLERS_PATHS } from "./handlersPaths.js";
import { generateHandlers } from "~/utils/generateHandlers.js";

export const generateDdbEsHandlers = generateHandlers("ddb-es", "api", HANDLERS_PATHS);
