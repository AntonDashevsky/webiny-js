import { useRecoilState } from "recoil";
import { uiAtom } from "~/editor/recoil/modules/index.js";

export function useUI() {
    return useRecoilState(uiAtom);
}
