import React from "react";
import { EditorConfig } from "@webiny/app-page-builder/editor/index.js";
import { HideIfEntriesListGridWithDataSource } from "./HideIfEntriesListGridWithDataSource.js";

const { ElementAction } = EditorConfig;

export const DisableGridDelete = ElementAction.createDecorator(Original => {
    return function DisableActions(props) {
        if (props.name === "delete") {
            return (
                <Original
                    {...props}
                    element={
                        <HideIfEntriesListGridWithDataSource>
                            {props.element}
                        </HideIfEntriesListGridWithDataSource>
                    }
                />
            );
        }
        return <Original {...props} />;
    };
});
