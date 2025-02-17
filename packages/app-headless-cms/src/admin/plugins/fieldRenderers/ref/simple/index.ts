import { createSimpleSingleRenderer } from "./simpleSingleRenderer.js";
import { createSimpleMultipleRenderer } from "./simpleMultipleRenderer.js";

export const createSimpleRefRenderer = () => {
    return [createSimpleSingleRenderer(), createSimpleMultipleRenderer()];
};
