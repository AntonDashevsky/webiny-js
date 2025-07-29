import type { EventActionCallable, EventActionHandlerCallableArgs } from "~/types";
import type { BlockAtomType } from "~/blockEditor/state";

export interface BlockEditorEventActionCallableState {
    block: BlockAtomType;
}

export type BlockEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, BlockEditorEventActionCallableState>;
