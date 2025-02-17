import { useRecoilState } from "recoil";
import { blockAtom } from "../state/index.js";

export function useBlock() {
    return useRecoilState(blockAtom);
}
