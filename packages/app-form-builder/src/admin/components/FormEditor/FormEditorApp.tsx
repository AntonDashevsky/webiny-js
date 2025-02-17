import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { useRouter } from "@webiny/react-router";
import { FormEditorProvider } from "./Context/index.js";
import FormEditor from "./FormEditor.js";

const FormEditorApp = () => {
    const { params } = useRouter();
    const client = useApolloClient();

    const id = params ? params["id"] : undefined;

    return (
        <FormEditorProvider
            key={id}
            apollo={client}
            id={id}
            defaultLayoutRenderer={"forms-form-layout-default"}
        >
            <FormEditor />
        </FormEditorProvider>
    );
};

export default FormEditorApp;
