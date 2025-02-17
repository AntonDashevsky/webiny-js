import React, { Fragment } from "react";
import { HasPermission } from "@webiny/app-security";

import { AddRoute, Layout } from "@webiny/app-admin";
import { GeneralSettings } from "./settingsGroups/GeneralSettings.js";
import { DefaultPages } from "./settingsGroups/DefaultPages.js";
import { WebsiteSettingsView } from "./WebsiteSettingsView.js";
import { FaviconAndLogo } from "./settingsGroups/FaviconAndLogo.js";
import { SocialMedia } from "./settingsGroups/SocialMedia.js";
import { HtmlTags } from "./settingsGroups/HtmlTags.js";
import { WebsiteSettingsWithConfig } from "./config/WebsiteSettingsConfig.js";

export const WebsiteSettings = () => {
    return (
        <Fragment>
            <HasPermission name={"pb.settings"}>
                <AddRoute path="/settings/page-builder/website">
                    <Layout title={"Page Builder - Website Settings"}>
                        <WebsiteSettingsWithConfig>
                            <WebsiteSettingsView />
                        </WebsiteSettingsWithConfig>
                    </Layout>
                </AddRoute>
            </HasPermission>
            <GeneralSettings />
            <DefaultPages />
            <FaviconAndLogo />
            <SocialMedia />
            <HtmlTags />
        </Fragment>
    );
};
