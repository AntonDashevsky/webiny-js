import { Metadata } from "./Metadata";
import type { Constructor } from "~/types";

export const isComposite = (implementation: Constructor) => {
    const metadata = new Metadata(implementation);
    return Boolean(metadata.getAttribute("IS_COMPOSITE"));
};
