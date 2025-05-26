import React, { useCallback } from "react";
import { Button } from "@webiny/admin-ui";
import { generateAlphaNumericLowerCaseId } from "@webiny/utils/generateId";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

export const ElementsButton = React.memo(() => {
    const editor = useDocumentEditor();
    const numberOfElements = useSelectFromDocument(state => {
        return Object.keys(state.elements).length - 1; // Don't count `root` element.
    });

    const createElement = useCallback(() => {
        editor.updateDocument(state => {
            const newId = generateAlphaNumericLowerCaseId();
            state.elements[newId] = {
                type: "Webiny/Element",
                id: newId,
                component: {
                    name: "Webiny/Text",
                    inputs: {
                        text: "New element!"
                    }
                }
            };
        });
    }, [editor]);

    return (
        <Button
            variant="secondary"
            onClick={createElement}
            text={`Elements: ${numberOfElements}`}
        ></Button>
    );
});
