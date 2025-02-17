import React from "react";
import { OptionsMenu } from "@webiny/app-admin";

import { useContentEntryEditorConfig } from "~/admin/config/contentEntries/index.js";
import { OptionMenuContainer } from "./ContentFormOptionsMenu.styles.js";

export const ContentFormOptionsMenu = () => {
    const { menuItemActions } = useContentEntryEditorConfig();

    return (
        <OptionMenuContainer>
            <OptionsMenu
                actions={menuItemActions}
                data-testid={"cms.content-form.header.more-options"}
            />
        </OptionMenuContainer>
    );
};
