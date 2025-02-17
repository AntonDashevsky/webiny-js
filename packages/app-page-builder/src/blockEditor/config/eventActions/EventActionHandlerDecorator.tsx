import React, { useEffect, useMemo, useRef } from "react";
import { createDecorator, DecoratableComponent, GenericComponent } from "@webiny/app-admin";
import {
    EventActionHandlerProvider,
    EventActionHandlerProviderProps,
    GetCallableState
} from "~/editor/contexts/EventActionHandlerProvider.js";
import { BlockEditorEventActionCallableState } from "~/blockEditor/types.js";
import { BlockAtomType } from "~/blockEditor/state/index.js";
import { useBlock } from "~/blockEditor/hooks/useBlock.js";

type ProviderProps = EventActionHandlerProviderProps<BlockEditorEventActionCallableState>;

export const EventActionHandlerDecorator = createDecorator(
    EventActionHandlerProvider as unknown as DecoratableComponent<GenericComponent<ProviderProps>>,
    Component => {
        return function PbEventActionHandlerProvider(props) {
            const blockAtomValueRef = useRef<BlockAtomType>();
            const [blockAtomValue, setBlockAtomValue] = useBlock();

            useEffect(() => {
                blockAtomValueRef.current = blockAtomValue;
            }, [blockAtomValue]);

            const saveCallablesResults: ProviderProps["saveCallablesResults"] = useMemo(
                () => [
                    ...(props.saveCallablesResults || []),
                    next => {
                        return ({ state, history = true }) => {
                            const res = next({ state, history });
                            if (res.state.block) {
                                setBlockAtomValue(res.state.block);
                            }

                            return { state, history };
                        };
                    }
                ],
                []
            );

            const getCallableState: GetCallableState = next => state => {
                const callableState = next(state);

                return {
                    block: blockAtomValueRef.current as BlockAtomType,
                    ...callableState
                };
            };

            return (
                <Component
                    {...props}
                    getCallableState={[...(props.getCallableState || []), getCallableState]}
                    saveCallablesResults={saveCallablesResults}
                />
            );
        };
    }
);
