import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarRoot } from "./components/SidebarRoot";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarMenuItem } from "./components/SidebarMenuItem";
import { SidebarMenuLink } from "./components/SidebarMenuLink";
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

const SidebarBase = React.forwardRef<React.ElementRef<typeof SidebarRoot>, SidebarProps>((props, ref) => {
    const { headerProps, rootProps, contentProps } = React.useMemo(() => {
        const {
            // Header props.
            title,
            icon,

            // Root props.
            side,

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
            },
            contentProps: rest
        };
    }, [props]);

    return (
        <SidebarRoot {...rootProps} ref={ref}>
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
    Link: SidebarMenuLink,
    Icon: SidebarIcon
});

export { Sidebar };
