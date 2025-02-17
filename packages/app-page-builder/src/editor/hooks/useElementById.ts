import { useRecoilState } from "recoil";
import { elementByIdSelector } from "~/editor/recoil/modules/index.js";

export function useElementById(id: string | null) {
    return useRecoilState(elementByIdSelector(id));
}
