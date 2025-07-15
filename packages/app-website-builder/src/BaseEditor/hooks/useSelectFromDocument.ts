import deepEqual from "deep-equal";
import { Document } from "~/sdk/types";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromState } from "./useSelectFromState";

type Equals<T> = (a: T, b: T) => boolean;

/**
 * Subscribe to part of the document state.
 * @param selector   Pick the slice of state you care about.
 * @param equals     (optional) comparator, defaults to Object.is
 */
export function useSelectFromDocument<T>(
    selector: (doc: Document) => T,
    deps: React.DependencyList = [],
    equals: Equals<T> = deepEqual
): T {
    const editor = useDocumentEditor();

    return useSelectFromState(
        () => editor.getDocumentState().read(),
        selector,
        [editor, ...deps],
        equals
    );
}
