import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Center } from "./DropZone/Center.js";
import { Horizontal, type HorizontalPropsType } from "./DropZone/Horizontal.js";
import { Vertical, type VerticalPropsType } from "./DropZone/Vertical.js";

export default {
    Above: makeDecoratable("Dropzone.Above", (props: HorizontalPropsType) => {
        return <Horizontal {...props} />;
    }),
    Below: makeDecoratable("Dropzone.Below", (props: HorizontalPropsType) => {
        return <Horizontal {...props} below />;
    }),
    Left: makeDecoratable("Dropzone.Left", (props: VerticalPropsType) => {
        return <Vertical {...props} />;
    }),
    Right: makeDecoratable("Dropzone.Right", (props: VerticalPropsType) => {
        return <Vertical {...props} last />;
    }),
    Center: makeDecoratable("Dropzone.Center", Center)
};
