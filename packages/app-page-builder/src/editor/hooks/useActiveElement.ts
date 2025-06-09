import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { activeElementAtom } from "~/editor/recoil/modules/index.js";
import { useElementById } from "~/editor/hooks/useElementById.js";
import { type PbEditorElement } from "~/types.js";

interface ActiveElementSetter {
    (element: PbEditorElement | string | null): void;
}

type MaybeElement = PbEditorElement | null;

export function useActiveElement<TElement = MaybeElement>(): [TElement, ActiveElementSetter] {
    const [activeElementId, setActiveElementId] = useRecoilState(activeElementAtom);
    const [activeElement] = useElementById(activeElementId);

    const setActiveElement = useCallback<ActiveElementSetter>(
        element => {
            if (typeof element === "string") {
                setActiveElementId(element);
                return;
            }

            if (!element) {
                setActiveElementId(null);
                return;
            }

            setActiveElement(element.id);
        },
        [activeElementId]
    );

    return [activeElement, setActiveElement] as unknown as [TElement, ActiveElementSetter];
}
