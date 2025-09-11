import React, { useMemo } from "react";
import type { IconPickerIconDto, IconPickerProps } from "@webiny/admin-ui";
import { IconPicker as AdminIconPicker } from "@webiny/admin-ui";
import { plugins } from "@webiny/plugins";
import type { CmsIconsPlugin } from "~/types";

export const IconPicker = (props: Omit<IconPickerProps, "icons">) => {
    const icons: IconPickerIconDto[] = useMemo(() => {
        const iconPlugins = plugins.byType<CmsIconsPlugin>("cms-icons");
        return iconPlugins.reduce((icons: Array<IconPickerIconDto>, pl) => {
            return icons.concat(pl.getIcons());
        }, []);
    }, []);

    return <AdminIconPicker size={"lg"} icons={icons} {...props} />;
};
