import React from "react";
import { useTemplate, TemplateEditorConfig } from "~/templateEditor/index.js";
import { DynamicDocumentProvider } from "~/dataInjection/index.js";
import { type PbDataBinding, type PbDataSource } from "~/types.js";

const { Ui } = TemplateEditorConfig;

export const SetupDynamicDocument = Ui.Layout.createDecorator(Original => {
    return function TemplateToDynamicDocument() {
        const [template, updateTemplate] = useTemplate();

        const onDataSources = (dataSources: PbDataSource[]) => {
            updateTemplate(template => ({ ...template, dataSources }));
        };

        const onDataBindings = (dataBindings: PbDataBinding[]) => {
            updateTemplate(template => ({ ...template, dataBindings }));
        };

        return (
            <DynamicDocumentProvider
                dataSources={template.dataSources}
                dataBindings={template.dataBindings}
                onDataSources={onDataSources}
                onDataBindings={onDataBindings}
            >
                <Original />
            </DynamicDocumentProvider>
        );
    };
});
