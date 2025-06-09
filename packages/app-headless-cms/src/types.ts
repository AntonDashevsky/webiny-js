import { type CmsContentEntry } from "@webiny/app-headless-cms-common/types/index.js";
import { type FolderTableItem, type RecordTableItem } from "@webiny/app-aco/table.types.js";
import { type DragSourceMonitor, type XYCoord } from "react-dnd";
import { type DragDropManager, type Identifier, type Listener, type Unsubscribe } from "dnd-core";

export * from "@webiny/app-headless-cms-common/types/index.js";

/***
 * ###### TABLE ########
 */
export type EntryTableItem = CmsContentEntry & RecordTableItem;

export type TableItem = FolderTableItem | EntryTableItem;

export declare class DragSourceMonitorImpl<DragObject = unknown, DropResult = unknown>
    implements DragSourceMonitor<DragObject, DropResult>
{
    private internalMonitor;
    private sourceId;
    constructor(manager: DragDropManager);
    receiveHandlerId(sourceId: Identifier | null): void;
    getHandlerId(): Identifier | null;
    subscribeToStateChange(
        listener: Listener,
        options?: {
            handlerIds: Identifier[] | undefined;
        }
    ): Unsubscribe;
    subscribeToOffsetChange(listener: Listener): Unsubscribe;
    canDrag(): boolean;
    isDragging(): boolean;
    getItemType(): Identifier | null;
    getItem<T = DragObject>(): T;
    getDropResult<T = DropResult>(): T | null;
    didDrop(): boolean;
    getInitialClientOffset(): XYCoord | null;
    getInitialSourceClientOffset(): XYCoord | null;
    getClientOffset(): XYCoord | null;
    getDifferenceFromInitialOffset(): XYCoord | null;
    getSourceClientOffset(): XYCoord | null;
    getTargetIds(): Identifier[];
}
