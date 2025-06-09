import React from "react";
import { ReactComponent as MediaIcon } from "./round-music_video-24px.svg";
import { type PbEditorPageElementGroupPlugin } from "../../../../types.js";

export default {
    name: "pb-editor-element-group-media",
    type: "pb-editor-page-element-group",
    group: {
        title: "Media",
        icon: <MediaIcon />
    }
} as PbEditorPageElementGroupPlugin;
