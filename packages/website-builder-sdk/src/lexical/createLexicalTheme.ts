import type { LexicalEditorTheme } from "~/types/LexicalEditorTheme";
import { createDefaultLexicalTheme } from "./createDefaultLexicalTheme";
import { deepMerge } from "./deepMerge";

export const createLexicalTheme = (theme: LexicalEditorTheme = {}): LexicalEditorTheme => {
    return deepMerge(createDefaultLexicalTheme(), theme);
};
