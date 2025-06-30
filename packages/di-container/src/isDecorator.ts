import { Metadata } from "./Metadata";
import type { Constructor } from "~/types";

export const isDecorator = (implementation: Constructor) => {
    const metadata = new Metadata(implementation);
    return Boolean(metadata.getAttribute("IS_DECORATOR"));
};
