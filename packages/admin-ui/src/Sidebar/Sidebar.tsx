import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarRoot } from "./components/SidebarRoot";
import { SidebarTrigger } from "./components/SidebarTrigger";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarSeparator } from "./components/SidebarSeparator";
import { SidebarMenuItem } from "./components/SidebarMenuItem";
import { SidebarGroup } from "./components/SidebarGroup";
import { SidebarProvider } from "./components/SidebarProvider";

interface SidebarProps
    extends React.ComponentPropsWithoutRef<typeof SidebarRoot>,
        React.ComponentPropsWithoutRef<typeof SidebarContent> {
    trigger?: React.ReactNode;
    children: React.ReactNode;
}

const SidebarBase = React.forwardRef<React.ElementRef<typeof SidebarRoot>, SidebarProps>(
    (props, ref) => {
        const { rootProps, triggerProps, contentProps } = React.useMemo(() => {
            const {
                // Root props.
                side,
                variant,
                collapsible,

                // Trigger props.
                trigger,

                // Content props.
                ...rest
            } = props;

            return {
                rootProps: {
                    side,
                    variant,
                    collapsible
                },
                triggerProps: {
                    // Temporary fix. We need this because `ref` doesn't get passed to components
                    // that are decorated with `makeDecoratable`. This will be fixed in the future.
                    children: <div className={"wby-inline-block"}>{trigger}</div>
                },
                contentProps: rest
            };
        }, [props]);

        return (
            <SidebarProvider>
                <SidebarRoot {...rootProps}>
                    {triggerProps.children && <SidebarTrigger {...triggerProps} asChild />}
                    <SidebarContent {...contentProps} ref={ref}>
                        {props.children}
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
    Item: SidebarMenuItem
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