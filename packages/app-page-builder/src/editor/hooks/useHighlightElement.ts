import type { SetterOrUpdater } from "recoil";
import { useRecoilState } from "recoil";
import { highlightElementAtom } from "~/editor/recoil/modules";
import { useElementById } from "~/editor/hooks/useElementById";
import type { PbEditorElement } from "~/types";

export function useHighlightElement(): [PbEditorElement | null, SetterOrUpdater<string | null>] {
    const [highlightedElementId, setHighlightedElement] = useRecoilState(highlightElementAtom);

    const [element] = useElementById(highlightedElementId);

    return [element, setHighlightedElement];
}
