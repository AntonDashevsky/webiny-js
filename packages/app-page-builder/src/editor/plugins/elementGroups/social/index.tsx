import React from "react";
import { ReactComponent as SocialIcon } from "@material-design-icons/svg/outlined/people.svg";
import { type PbEditorPageElementGroupPlugin } from "~/types.js";

export default {
    name: "pb-editor-element-group-social",
    type: "pb-editor-page-element-group",
    group: {
        title: "Social",
        icon: <SocialIcon />
    }
} as PbEditorPageElementGroupPlugin;
