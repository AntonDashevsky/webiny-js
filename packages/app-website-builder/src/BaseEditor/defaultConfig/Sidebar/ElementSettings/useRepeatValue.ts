import { useCallback } from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { useDocumentEditor } from "~/DocumentEditor";

export const useRepeatValue = (elementId: string) => {
    const editor = useDocumentEditor();

    const value = useSelectFromDocument(document => {
        const bindings = document.bindings[elementId] || {};
        if (bindings["$repeat"]) {
            return bindings["$repeat"][0].value as string;
        }
        return undefined;
    }, [elementId]);

    const onChange = useCallback((value: string | undefined) => {
        editor.updateDocument(document => {
            const bindings = document.bindings[elementId] ?? {};
            if (!value) {
                delete bindings["$repeat"];
            } else {
                bindings["$repeat"] = [
                    {
                        type: "expression",
                        value
                    }
                ];
            }

            document.bindings[elementId] = bindings;
        });
    }, [elementId]);

    return { value, onChange };
};
