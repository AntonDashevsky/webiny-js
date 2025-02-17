import React from "react";
import { plugins } from "@webiny/plugins";
import { useRouter } from "@webiny/react-router";
import { Editor as PbEditor } from "~/admin/components/Editor.js";

import { EditorLoadingScreen } from "~/admin/components/EditorLoadingScreen.js";
import { createStateInitializer } from "./createStateInitializer.js";
import { DefaultEditorConfig } from "~/editor/defaultConfig/DefaultEditorConfig.js";
import { DefaultTemplateEditorConfig } from "./config/DefaultTemplateEditorConfig.js";
import elementVariableRendererPlugins from "~/blockEditor/plugins/elementVariables/index.js";
import { usePrepareEditor } from "~/templateEditor/usePrepareEditor.js";

export const TemplateEditor = () => {
    plugins.register(elementVariableRendererPlugins());

    const { params } = useRouter();
    const templateId = decodeURIComponent(params["id"]);
    const template = usePrepareEditor(templateId);

    return (
        <>
            <DefaultEditorConfig />
            <DefaultTemplateEditorConfig />
            {template ? (
                <PbEditor stateInitializerFactory={createStateInitializer(template)} />
            ) : (
                <EditorLoadingScreen />
            )}
        </>
    );
};
