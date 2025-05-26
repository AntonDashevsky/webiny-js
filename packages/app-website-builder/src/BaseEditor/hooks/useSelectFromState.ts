import deepEqual from "deep-equal";
import { useState, useEffect } from "react";
import { reaction, IReactionDisposer } from "mobx";

type Equals<T> = (a: T, b: T) => boolean;

/**
 * Subscribe to part of the document state.
 * @param selector   Pick the slice of state you care about.
 * @param equals     (optional) comparator, defaults to Object.is
 */
export function useSelectFromState<TState, T>(
    getState: () => TState,
    selector: (doc: TState) => T,
    deps: React.DependencyList = [],
    equals: Equals<T> = deepEqual
): T {
    // Pull the initial slice synchronously
    const state = getState();

    const [value, setValue] = useState<T>(() => selector(state));

    useEffect(() => {
        // reaction tracks selector(doc) and only fires when newVal !== oldVal
        const disposer: IReactionDisposer = reaction(
            () => {
                const state = getState();

                return selector(state);
            },
            (newValue, oldValue) => {
                if (!equals(oldValue, newValue)) {
                    setValue(newValue);
                }
            },
            {
                // use your comparator to decide if newValue “really” changed
                equals,
                // we already set initial via useState
                fireImmediately: false
            }
        );

        return () => {
            // clean up when the component unmounts
            disposer();
        };
    }, [selector, equals, ...deps]);

    return value;
}
