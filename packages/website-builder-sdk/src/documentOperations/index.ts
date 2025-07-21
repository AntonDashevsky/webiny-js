export type { IDocumentOperation } from "./IDocumentOperation";
import { AddElement } from "./AddElement";
import { AddToParent } from "./AddToParent";
import { RemoveElement } from "./RemoveElement";
import { SetGlobalInputBinding } from "./SetGlobalInputBinding";
import { SetGlobalStyleBinding } from "./SetGlobalStyleBinding";
import { SetInputBindingOverride } from "./SetInputBindingOverride";
import { SetStyleBindingOverride } from "./SetStyleBindingOverride";

export const DocumentOperations = {
    AddElement,
    AddToParent,
    RemoveElement,
    SetGlobalInputBinding,
    SetGlobalStyleBinding,
    SetInputBindingOverride,
    SetStyleBindingOverride
};
