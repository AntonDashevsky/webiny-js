import type * as React from "react";
import type { Plugin } from "@webiny/plugins/types";

export type AdminWelcomeScreenWidgetPlugin = Plugin & {
    type: "admin-welcome-screen-widget";
    permission?: string;
    widget: {
        title: string;
        description: string;
        icon?: React.ReactElement;
        cta: React.ReactNode;
    };
};
