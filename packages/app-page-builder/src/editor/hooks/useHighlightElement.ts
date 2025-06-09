import { useRecoilState, type SetterOrUpdater } from "recoil";
import { highlightElementAtom } from "~/editor/recoil/modules/index.js";
import { useElementById } from "~/editor/hooks/useElementById.js";
import { type PbEditorElement } from "~/types.js";

export function useHighlightElement(): [PbEditorElement | null, SetterOrUpdater<string | null>] {
    const [highlightedElementId, setHighlightedElement] = useRecoilState(highlightElementAtom);

    const [element] = useElementById(highlightedElementId);

    return [element, setHighlightedElement];
}
