import { useRecoilState } from "recoil";
import { pageAtom } from "../state/index.js";

export function usePage() {
    return useRecoilState(pageAtom);
}
