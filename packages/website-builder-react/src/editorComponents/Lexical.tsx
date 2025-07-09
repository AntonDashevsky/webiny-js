"use client";
import React from "react";
import { LexicalHtmlRenderer } from "@webiny/lexical-editor";
import type { ComponentProps } from "~/types";

export const createLexicalValue = (value: string) => {
    return {
        state: `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"${value}\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph-element\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\",\"styles\":[{\"styleId\":\"paragraph1\",\"type\":\"typography\"}]}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`
    };
};

type LexicalProps = ComponentProps<{
    content: {
        state: string;
        html?: string;
    };
}>;

export const LexicalComponent = ({ inputs }: LexicalProps) => {
    const { state, html } = inputs.content;

    if (html) {
        return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
    }

    return <LexicalHtmlRenderer value={state} theme={{}} />;
};
