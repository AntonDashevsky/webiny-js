import React from "react";
import { useDrop } from "react-dnd";
import { cn, Icon } from "@webiny/admin-ui";
import { ReactComponent as InsertIcon } from "@webiny/icons/add_circle.svg";
import { ReactComponent as BlockIcon } from "@webiny/icons/block.svg";
import { Box } from "~/BaseEditor/defaultConfig/Content/Preview/Box";
import { DropEvent } from "~/BaseEditor/defaultConfig/Content/Preview/useProximityDropzone";
import { useIsDragging } from "~/BaseEditor/defaultConfig/Content/Preview/useIsDragging";

interface DropBoxProps {
    box: Box;
    onDrop: (event: DropEvent) => void;
}

export const DropBox = ({ box, onDrop }: DropBoxProps) => {
    const isDragging = useIsDragging();

    const canAcceptItem = (item: any) => {
        return true;
        // return item.name !== "Webiny/BlockRef";
    };

    const [{ item, isOver }, dropRef] = useDrop<
        unknown,
        unknown,
        { item: { name: string }; isOver: boolean }
    >(() => ({
        accept: "ELEMENT",
        drop: item => {
            if (!canAcceptItem(item)) {
                return;
            }
            onDrop({ item, target: { parentId: box.parentId, index: 0, slot: box.parentSlot } });
        },
        collect: monitor => ({
            item: monitor.getItem(),
            isOver: monitor.isOver()
        })
    }));

    const canAccept = isDragging ? canAcceptItem(item) : true;
    const disabled = "wby-border-neutral-muted wby-fill-neutral-disabled";
    const enabled = "wby-border-success-default wby-fill-success";
    const mouseOver = "wby-border-accent-default wby-fill-accent-default";

    const classes = cn(
        "wby-flex wby-absolute wby-items-center wby-justify-center wby-border-sm wby-border-dashed",
        canAccept && isOver && mouseOver,
        canAccept && !isOver && enabled,
        !canAccept && disabled
    );

    return (
        <div
            data-role={"element-slot"}
            data-slot-id={box.id}
            ref={dropRef}
            className={classes}
            style={{
                zIndex: 1000 + box.depth,
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height
            }}
        >
            <Icon
                icon={isDragging && !canAccept ? <BlockIcon /> : <InsertIcon />}
                label={"Add Element"}
            />
        </div>
    );
};
