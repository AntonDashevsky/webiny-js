import { atom } from "recoil";
import { type PbPageTemplate } from "~/types.js";

export const templateAtom = atom<PbPageTemplate>({
    key: "templateAtom"
});
