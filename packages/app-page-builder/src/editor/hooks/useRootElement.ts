import { useRecoilValue } from "recoil";
import { elementWithChildrenByIdSelector, rootElementAtom } from "~/editor/recoil/modules/index.js";
import { PbEditorElement } from "~/types.js";

export function useRootElement() {
    const rootElementId = useRecoilValue(rootElementAtom);
    return useRecoilValue(elementWithChildrenByIdSelector(rootElementId)) as PbEditorElement;
}
