import React from "react";
import { Content as ContentType } from "~/types.js";
import { Element } from "./Element.js";

export interface ContentProps {
    content: ContentType;
}

export const Content = (props: ContentProps) => {
    return <Element element={props.content} />;
};
