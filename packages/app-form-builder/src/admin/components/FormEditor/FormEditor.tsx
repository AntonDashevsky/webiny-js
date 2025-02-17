import * as React from "react";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
// Components
import EditorBar from "./Bar.js";
import EditorContent from "./EditorContent.js";
import DragPreview from "./DragPreview.js";
import { useFormEditor } from "./Context/index.js";

const FormEditor = () => {
    const {
        getForm,
        state: { data, id }
    } = useFormEditor();

    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();

    React.useEffect((): void => {
        getForm(id).catch(() => {
            history.push(`/form-builder/forms`);
            showSnackbar("Could not load form with given ID.");
        });
    }, [id]);

    if (!data) {
        return null;
    }

    return (
        <div className={"form-editor"}>
            <EditorBar />
            <EditorContent />
            <DragPreview />
        </div>
    );
};

export default FormEditor;
