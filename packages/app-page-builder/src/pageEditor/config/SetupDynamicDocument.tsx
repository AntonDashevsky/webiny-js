import React from "react";
import { PageEditorConfig } from "~/pageEditor/index.js";
import { DynamicDocumentProvider } from "~/dataInjection/index.js";
import { usePage } from "~/pageEditor/index.js";
import { type PbDataBinding, type PbDataSource } from "~/types.js";
import { useEventActionHandler } from "~/editor/index.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";

const { Ui } = PageEditorConfig;

export const SetupDynamicDocument = Ui.Layout.createDecorator(Original => {
    return function PageToDynamicDocument() {
        const eventActionHandler = useEventActionHandler();
        const [page, updatePage] = usePage();

        const onDataSources = (dataSources: PbDataSource[]) => {
            updatePage(page => ({ ...page, dataSources }));
            eventActionHandler.trigger(
                new UpdateDocumentActionEvent({
                    history: false,
                    document: {
                        dataSources
                    }
                })
            );
        };

        const onDataBindings = (dataBindings: PbDataBinding[]) => {
            updatePage(page => ({ ...page, dataBindings }));
            eventActionHandler.trigger(
                new UpdateDocumentActionEvent({
                    history: false,
                    document: {
                        dataBindings
                    }
                })
            );
        };

        return (
            <DynamicDocumentProvider
                dataSources={page.dataSources || []}
                dataBindings={page.dataBindings || []}
                onDataSources={onDataSources}
                onDataBindings={onDataBindings}
            >
                <Original />
            </DynamicDocumentProvider>
        );
    };
});
