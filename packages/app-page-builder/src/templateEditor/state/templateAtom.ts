import { atom } from "recoil";
import { PbPageTemplate } from "~/types.js";

export const templateAtom = atom<PbPageTemplate>({
    key: "templateAtom"
});
