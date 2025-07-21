import { customAlphabet } from "nanoid";
// @ts-expect-error
import { lowercase, numbers } from "nanoid-dictionary";

const DEFAULT_SIZE = 21;

export const generateElementId = customAlphabet(`${lowercase}${numbers}`, DEFAULT_SIZE);
