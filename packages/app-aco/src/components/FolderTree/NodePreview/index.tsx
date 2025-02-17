import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";

import { FolderNode } from "../Node/index.js";
import { Container } from "./styled.js";

import { DndFolderItemData } from "~/types.js";

type NodePreviewProps = {
    monitorProps: DragLayerMonitorProps<DndFolderItemData>;
};

export const NodePreview = (props: NodePreviewProps) => {
    const item = props.monitorProps.item;

    return (
        <Container>
            <FolderNode text={item.text} isOpen={false} isRoot={false} />
        </Container>
    );
};
