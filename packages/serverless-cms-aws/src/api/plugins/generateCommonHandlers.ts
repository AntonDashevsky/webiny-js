import { generateHandlers } from "~/utils/generateHandlers.js";

const COMMON_HANDLERS_PATHS = [["fileManager", "manage"]];

export const generateCommonHandlers = generateHandlers("common", "api", COMMON_HANDLERS_PATHS);
