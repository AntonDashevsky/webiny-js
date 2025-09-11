export type LexicalValue = string;

export type NormalizedInputValue = LexicalValue | null;

export { FontColorPicker } from "~/components/ToolbarActions/FontColorAction.js";

export type ImageActionType = "image-action";
export type ToolbarActionType = ImageActionType | string;
export interface ToolbarActionPlugin {
    targetAction: ToolbarActionType;
    plugin: Record<string, any> | ((cb: (value: any) => void) => any) | undefined;
}

/* Commands payload types */
export { type ImagePayload } from "~/commands/index.js";

/* Lexical editor interfaces */
export { type RichTextEditorProps } from "~/components/Editor/RichTextEditor.js";

// lexical types
export type { Klass, LexicalNode } from "lexical";
