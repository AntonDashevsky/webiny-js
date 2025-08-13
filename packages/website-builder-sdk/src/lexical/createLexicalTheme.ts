import type { LexicalEditorTheme } from "~/types/LexicalEditorTheme.js";
import { createDefaultLexicalTheme } from "./createDefaultLexicalTheme.js";
import { deepMerge } from "./deepMerge.js";

export const createLexicalTheme = (theme: LexicalEditorTheme = {}): LexicalEditorTheme => {
    return deepMerge(createDefaultLexicalTheme(), theme);
};
