import React from "react";
import { ReactComponent as ImageGroupIcon } from "../../../assets/icons/round-collections-24px.svg";
import { type PbEditorPageElementGroupPlugin } from "../../../../types.js";

const imageGroup: PbEditorPageElementGroupPlugin = {
    name: "pb-editor-element-group-image",
    type: "pb-editor-page-element-group",
    group: {
        title: "Image",
        icon: <ImageGroupIcon />
    }
};

export default imageGroup;
