import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { EventActionHandlerProvider } from "./EventActionHandlerProvider.js";
import { EditorPageElementsProvider } from "~/editor/contexts/EditorPageElementsProvider.js";

export const EditorProvider = makeDecoratable("EditorProvider", ({ children }) => {
    return (
        <EventActionHandlerProvider>
            <EditorPageElementsProvider>{children}</EditorPageElementsProvider>
        </EventActionHandlerProvider>
    );
});
