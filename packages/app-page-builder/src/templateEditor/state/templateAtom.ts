import { atom } from "recoil";
import type { PbPageTemplate } from "~/types";

export const templateAtom = atom<PbPageTemplate>({
    key: "templateAtom"
});
