import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarRoot } from "./components/SidebarRoot";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarSeparator } from "./components/SidebarSeparator";
import { SidebarMenuItem } from "./components/SidebarMenuItem";
import { SidebarGroup } from "./components/SidebarGroup";
import { SidebarProvider } from "./components/SidebarProvider";
import { SidebarMenu } from "./components/SidebarMenu";
import { SidebarHeader } from "~/Sidebar/components/SidebarHeader";
import { SidebarIcon } from "~/Sidebar/components/SidebarIcon";

interface SidebarProps
    extends Omit<React.ComponentPropsWithoutRef<typeof SidebarRoot>, "title">,
        Omit<React.ComponentPropsWithoutRef<typeof SidebarProvider>, "title">,
        Omit<React.ComponentPropsWithoutRef<typeof SidebarContent>, "title"> {
    title?: React.ReactNode;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const SidebarBase = React.forwardRef<React.ElementRef<typeof SidebarRoot>, SidebarProps>(
    (props, ref) => {
        const { headerProps, rootProps, contentProps } = React.useMemo(() => {
            const {
                // Header props.
                title,
                icon,

                // Provider props.
                defaultOpen,
                open,
                onOpenChange,

                // Root props.
                side,
                variant,
                collapsible,

                // Content props.
                ...rest
            } = props;

            return {
                headerProps: {
                    title,
                    icon
                },
                providerProps: {
                    defaultOpen,
                    open,
                    onOpenChange
                },
                rootProps: {
                    side,
                    variant,
                    collapsible
                },
                contentProps: rest
            };
        }, [props]);

        return (
            <SidebarProvider>
                <SidebarRoot {...rootProps}>
                    <SidebarHeader {...headerProps} />
                    <SidebarContent {...contentProps} ref={ref}>
                        <SidebarMenu>{props.children}</SidebarMenu>
                    </SidebarContent>
                </SidebarRoot>
            </SidebarProvider>
        );
    }
);

SidebarBase.displayName = "Sidebar";

const DecoratableSidebar = makeDecoratable("Sidebar", SidebarBase);

const Sidebar = withStaticProps(DecoratableSidebar, {
    Separator: SidebarSeparator,
    Group: SidebarGroup,
    Item: SidebarMenuItem,
    Icon: SidebarIcon
});

export { Sidebar };


// <Sidebar>
//     <SidebarContent>
//         <SidebarGroup>
//             <SidebarGroupLabel>Projects</SidebarGroupLabel>
//             <SidebarGroupContent>
//                 <SidebarMenu>
//                     {projects.map((project) => (
//                         <SidebarMenuItem key={project.name}>
//                             <SidebarMenuButton asChild>
//                                 <a href={project.url}>
//                                     <project.icon />
//                                     <span>{project.name}</span>
//                                 </a>
//                             </SidebarMenuButton>
//                         </SidebarMenuItem>
//                     ))}
//                 </SidebarMenu>
//             </SidebarGroupContent>
//         </SidebarGroup>
//     </SidebarContent>
// </Sidebar>