import { useRecoilState } from "recoil";
import { revisionsAtom } from "../state/index.js";

export function useRevisions() {
    return useRecoilState(revisionsAtom);
}
