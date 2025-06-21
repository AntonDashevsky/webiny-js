import type { ResponsiveStyles } from "~/sdk/types";

export interface CreateElementParams {
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
