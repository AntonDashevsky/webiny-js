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
    name: "admin-welcome-screen-widget-page-builder",
    permission: "pb.page",
    widget: {
        cta: (
            <Link to="/page-builder/pages" className={linkStyle}>
                <ButtonSecondary className={buttonStyle}>Build a new Page</ButtonSecondary>
            </Link>
        ),
        description: "Build stunning landing pages with an easy to use drag and drop editor.",
        title: "Page Builder"
    }
};

export default plugin;
