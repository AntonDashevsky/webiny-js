import React from "react";
import { plugins } from "@webiny/plugins";
import { createRepeaterElement } from "~/admin/elements/repeater.js";
import { createEntriesListElement } from "~/admin/elements/entriesList.js";
import { DynamicGrid } from "./renderers/DynamicGrid.js";
import { createEntriesSearchElement } from "~/admin/elements/entriesSearch.js";

export const Elements = React.memo(function Elements() {
    plugins.register(
        createRepeaterElement(),
        createEntriesListElement(),
        createEntriesSearchElement()
    );

    return (
        <>
            <DynamicGrid />
        </>
    );
});
