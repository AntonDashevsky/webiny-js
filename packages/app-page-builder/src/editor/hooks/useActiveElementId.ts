import { useRecoilState } from "recoil";
import { activeElementAtom } from "~/editor/recoil/modules/index.js";

export function useActiveElementId() {
    return useRecoilState(activeElementAtom);
}
