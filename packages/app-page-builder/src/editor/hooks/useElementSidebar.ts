import { useRecoilState } from "recoil";
import { sidebarAtom } from "~/editor/recoil/modules/index.js";

export function useElementSidebar() {
    return useRecoilState(sidebarAtom);
}
