import React from "react";
import { PbEditorElement } from "~/types.js";

import PeTab from "./PeTab.js";
import { Element } from "@webiny/app-page-builder-elements/types.js";

interface TabProps {
    element: PbEditorElement;
}

const Tab = (props: TabProps) => {
    const { element, ...rest } = props;
    return <PeTab element={element as Element} {...rest} />;
};

export default Tab;
