import React from "react";
import { ReactComponent as SocialIcon } from "@webiny/icons/people.svg";
import type { PbEditorPageElementGroupPlugin } from "~/types";

export default {
    name: "pb-editor-element-group-social",
    type: "pb-editor-page-element-group",
    group: {
        title: "Social",
        icon: <SocialIcon />
    }
} as PbEditorPageElementGroupPlugin;
