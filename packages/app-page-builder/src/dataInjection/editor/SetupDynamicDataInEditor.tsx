import React from "react";
import { EditorConfig } from "~/editor/index.js";
import { InjectDynamicValues } from "./InjectDynamicValues.js";
import { AddBindingContext, DataSourceProvider, useDynamicDocument } from "~/dataInjection/index.js";
import { DataSourceConfigAndBindings } from "./DataSourceConfigAndBindings.js";
import { ElementInputs } from "~/dataInjection/editor/DataSourceProperties/ElementInputs.js";
import { DeveloperUtilities } from "./DeveloperUtilities.js";

const { Ui } = EditorConfig;

const ContentDecorator = Ui.Content.createDecorator(Original => {
    return function ContentWithPreview() {
        const { dataSources } = useDynamicDocument();

        const dataSource = dataSources.find(ds => ds.name === "main");

        if (!dataSource) {
            return <Original />;
        }

        return (
            <DataSourceProvider dataSource={dataSource!}>
                <Original />
            </DataSourceProvider>
        );
    };
});

export const SetupDynamicDataInEditor = () => {
    return (
        <>
            <DeveloperUtilities />
            <ContentDecorator />
            <InjectDynamicValues />
            <AddBindingContext />
            <DataSourceConfigAndBindings />
            <ElementInputs />
        </>
    );
};
