import type { ResponsiveStyles } from "~/sdk/types";

interface CreateElementParams {
    component: string;
    inputs?: Record<string, any>;
    styles?: ResponsiveStyles;
}

export const createElement = (params: CreateElementParams) => {
    return {
        action: "CreateElement",
        params
    };
};
