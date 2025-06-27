import React from "react";
import { LexicalHtmlRenderer } from "@webiny/lexical-editor";
import type { ComponentProps } from "@webiny/app-website-builder/react";

export const createLexicalValue = (value: string) => {
    return `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"${value}\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph-element\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\",\"styles\":[{\"styleId\":\"paragraph1\",\"type\":\"typography\"}]}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`;
};

type RichTextProps = ComponentProps<{
    content: string;
}>;

export const RichTextComponent = ({ inputs }: RichTextProps) => {
    return <LexicalHtmlRenderer value={inputs.content} theme={{}} />;
};
