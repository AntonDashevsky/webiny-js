import React from "react";
import type { PbEditorElement } from "~/types";

import PeTabs from "./PeTabs";
import type { Element } from "@webiny/app-page-builder-elements/types";

interface TabsProps {
    element: PbEditorElement;
}

const Tabs = (props: TabsProps) => {
    const { element, ...rest } = props;
    return <PeTabs element={element as Element} {...rest} />;
};

export default Tabs;
