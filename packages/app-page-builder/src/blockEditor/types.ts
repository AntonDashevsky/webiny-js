import { type EventActionCallable, type EventActionHandlerCallableArgs } from "~/types.js";
import { type BlockAtomType } from "~/blockEditor/state/index.js";

export interface BlockEditorEventActionCallableState {
    block: BlockAtomType;
}

export type BlockEventActionCallable<TArgs extends EventActionHandlerCallableArgs = any> =
    EventActionCallable<TArgs, BlockEditorEventActionCallableState>;
