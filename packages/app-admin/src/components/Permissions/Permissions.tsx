import React, { useMemo } from "react";
import type { AdminAppPermissionRendererPlugin } from "~/types";
import { Accordion } from "@webiny/ui/Accordion";
import { plugins } from "@webiny/plugins";
import type { BindComponentRenderProp } from "@webiny/form";
import type { PermissionRendererPlugin } from "~/plugins/PermissionRendererPlugin";

interface PermissionsProps extends BindComponentRenderProp {
    id: string;
    plugins?: PermissionRendererPlugin[];
}

interface PermissionPlugins {
    systemPlugins: (AdminAppPermissionRendererPlugin | PermissionRendererPlugin)[];
    permissionPlugins: (AdminAppPermissionRendererPlugin | PermissionRendererPlugin)[];
}

export const Permissions = ({ id, value, onChange, ...props }: PermissionsProps) => {
    const { systemPlugins, permissionPlugins } = useMemo<PermissionPlugins>(() => {
        if (props.plugins) {
            return { permissionPlugins: props.plugins, systemPlugins: [] };
        }

        return plugins
            .byType<AdminAppPermissionRendererPlugin>("admin-app-permissions-renderer")
            .reduce(
                (acc, plugin) => {
                    if (plugin.system === true) {
                        acc.systemPlugins.push(plugin);
                    } else {
                        acc.permissionPlugins.push(plugin);
                    }
                    return acc;
                },
                { systemPlugins: [], permissionPlugins: [] } as PermissionPlugins
            );
    }, []);

    return (
        <Accordion elevation={0}>
            {[...systemPlugins, ...permissionPlugins].map(pl => (
                <React.Fragment key={pl.name + "." + id}>
                    {pl.render({
                        value,
                        onChange
                    })}
                </React.Fragment>
            ))}
        </Accordion>
    );
};
