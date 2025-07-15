import deepEqual from "deep-equal";
import { useState, useEffect, useMemo } from "react";
import { autorun } from "mobx";

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
    const initialValue = useMemo(() => selector(getState()), deps);
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        setValue(selector(getState())); // reset state on dep change
    }, deps);

    useEffect(() => {
        let previous = selector(getState());

        const disposer = autorun(() => {
            const next = selector(getState());
            if (!equals(previous, next)) {
                previous = next;
                setValue(next);
            }
        });

        return () => disposer();
    }, [...deps]);

    return value;
}
