import React from "react";
import { type PbEditorElement } from "~/types.js";

import PeTabs from "./PeTabs.js";
import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface TabsProps {
    element: PbEditorElement;
}

const Tabs = (props: TabsProps) => {
    const { element, ...rest } = props;
    return <PeTabs element={element as Element} {...rest} />;
};

export default Tabs;
