import { EventActionCallable, EventActionHandlerCallableArgs } from "~/types.js";
import { BlockAtomType } from "~/blockEditor/state/index.js";

export interface BlockEditorEventActionCallableState {
    block: BlockAtomType;
}

export type BlockEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, BlockEditorEventActionCallableState>;
