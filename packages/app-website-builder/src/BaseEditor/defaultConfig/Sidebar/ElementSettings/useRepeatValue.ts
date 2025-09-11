import set from "lodash/set";
import { useCallback } from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { useDocumentEditor } from "~/DocumentEditor";

export const useRepeatValue = (elementId: string) => {
    const editor = useDocumentEditor();

    const value = useSelectFromDocument(
        document => {
            const bindings = document.bindings[elementId] || {};

            return bindings.$repeat?.expression;
        },
        [elementId]
    );

    const onChange = useCallback(
        (value: string | undefined) => {
            editor.updateDocument(document => {
                const bindings = document.bindings[elementId] ?? {};
                if (!value) {
                    delete bindings.$repeat;
                } else {
                    set(bindings, "$repeat.expression", value);
                }

                document.bindings[elementId] = bindings;
            });
        },
        [elementId]
    );

    return { value, onChange };
};
