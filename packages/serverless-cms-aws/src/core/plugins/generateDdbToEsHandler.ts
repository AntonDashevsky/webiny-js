import { generateHandlers } from "~/utils/generateHandlers.js";

export const generateDdbToEsHandler = generateHandlers("ddb-es", "core", [["dynamoToElastic"]]);
