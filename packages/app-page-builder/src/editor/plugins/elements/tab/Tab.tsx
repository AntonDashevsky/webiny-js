import React from "react";
import type { PbEditorElement } from "~/types";

import PeTab from "./PeTab";
import type { Element } from "@webiny/app-page-builder-elements/types";

interface TabProps {
    element: PbEditorElement;
}

const Tab = (props: TabProps) => {
    const { element, ...rest } = props;
    return <PeTab element={element as Element} {...rest} />;
};

export default Tab;
