import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-page-builder";
import { RepeaterRenderer } from "~/dataInjection/renderers/Repeater.js";
import { EntriesListRenderer } from "~/dataInjection/renderers/EntriesList.js";
import { EntriesSearchRenderer } from "~/dataInjection/renderers/EntriesSearch.js";
import { DynamicGrid } from "~/dataInjection/renderers/DynamicGrid.js";

export const DynamicElementRenderers = () => {
    return (
        <>
            <PbRenderElementPlugin elementType={"repeater"} renderer={RepeaterRenderer} />
            <PbRenderElementPlugin elementType={"entries-list"} renderer={EntriesListRenderer} />
            <PbRenderElementPlugin
                elementType={"entries-search"}
                renderer={EntriesSearchRenderer}
            />
            <DynamicGrid />
        </>
    );
};
