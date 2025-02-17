import { useRecoilState } from "recoil";
import { templateAtom } from "../state/index.js";

export function useTemplate() {
    return useRecoilState(templateAtom);
}
