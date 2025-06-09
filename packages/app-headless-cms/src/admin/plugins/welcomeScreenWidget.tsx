import React from "react";
import { Link } from "@webiny/react-router";
import { type AdminWelcomeScreenWidgetPlugin } from "@webiny/app-plugin-admin-welcome-screen/types.js";
import { ButtonSecondary } from "@webiny/ui/Button/index.js";
import { css } from "emotion";

const linkStyle = css({
    textDecoration: "none",
    "&:hover": {
        textDecoration: "none"
    }
});

const buttonStyle = css({
    margin: "1rem auto 1rem auto"
});

const plugin: AdminWelcomeScreenWidgetPlugin = {
    type: "admin-welcome-screen-widget",
    name: "admin-welcome-screen-widget-headless-cms",
    permission: "cms.endpoint.manage",
    widget: {
        cta: (
            <Link to="/cms/content-models" className={linkStyle}>
                <ButtonSecondary className={buttonStyle}>New Content Model</ButtonSecondary>
            </Link>
        ),
        description: "GraphQL based headless CMS with powerful content modeling features.",
        title: "Headless CMS"
    }
};

export default plugin;
