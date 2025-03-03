import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarRoot } from "./components/SidebarRoot";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarMenuItem } from "./components/SidebarMenuItem";
import { SidebarMenu } from "./components/SidebarMenu";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarIcon } from "./components/SidebarIcon";
import { SidebarFooter } from "./components/SidebarFooter";

interface SidebarProps
    extends Omit<React.ComponentPropsWithoutRef<typeof SidebarRoot>, "title">,
        Omit<React.ComponentPropsWithoutRef<typeof SidebarContent>, "title"> {
    title?: React.ReactNode;
    icon?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const SidebarBase = React.forwardRef<React.ElementRef<typeof SidebarRoot>, SidebarProps>(props => {
    const { headerProps, rootProps, contentProps } = React.useMemo(() => {
        const {
            // Header props.
            title,
            icon,

            // Root props.
            side,
            collapsible,

            // Content props.
            ...rest
        } = props;

        return {
            headerProps: {
                title,
                icon
            },
            rootProps: {
                side,
                collapsible
            },
            contentProps: rest
        };
    }, [props]);

    return (
        <SidebarRoot {...rootProps}>
            <SidebarHeader {...headerProps} />
            <SidebarContent {...contentProps}>
                <SidebarMenu>{props.children}</SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>{props.footer}</SidebarMenu>
            </SidebarFooter>
        </SidebarRoot>
    );
});

SidebarBase.displayName = "Sidebar";

const DecoratableSidebar = makeDecoratable("Sidebar", SidebarBase);

const Sidebar = withStaticProps(DecoratableSidebar, {
    Item: SidebarMenuItem,
    Icon: SidebarIcon
});

export { Sidebar };
