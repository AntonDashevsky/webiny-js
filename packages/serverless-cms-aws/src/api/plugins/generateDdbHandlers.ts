import { HANDLERS_PATHS } from "./handlersPaths.js";
import { generateHandlers } from "~/utils/generateHandlers.js";

export const generateDdbHandlers = generateHandlers("ddb", "api", HANDLERS_PATHS);
