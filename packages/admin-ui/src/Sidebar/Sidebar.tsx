import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarRoot } from "./components/SidebarRoot";
import { SidebarTrigger } from "./components/SidebarTrigger";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarSeparator } from "./components/SidebarSeparator";
import { SidebarItem } from "./components/SidebarItem";
import { SidebarCheckboxItem } from "./components/SidebarCheckboxItem";
import { SidebarLabel } from "./components/SidebarLabel";
import { SidebarGroup } from "./components/SidebarGroup";
import { SidebarPortal } from "./components/SidebarPortal";

interface SidebarProps
    extends React.ComponentPropsWithoutRef<typeof SidebarRoot>,
        React.ComponentPropsWithoutRef<typeof SidebarContent> {
    trigger?: React.ReactNode;
    children: React.ReactNode;
}

const SidebarBase = React.forwardRef<
    React.ElementRef<typeof SidebarRoot>,
    SidebarProps
>((props, ref) => {
    const { rootProps, triggerProps, contentProps } = React.useMemo(() => {
        const {
            // Root props.
            defaultOpen,
            open,
            onOpenChange,

            dir,

            // Trigger props.
            trigger,

            // Content props.
            ...rest
        } = props;

        return {
            rootProps: {
                defaultOpen,
                open,
                onOpenChange,
                dir
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
        <SidebarRoot {...rootProps}>
            {triggerProps.children && <SidebarTrigger {...triggerProps} asChild />}
            <SidebarPortal>
                <SidebarContent {...contentProps} ref={ref} />
            </SidebarPortal>
        </SidebarRoot>
    );
});

SidebarBase.displayName = "Sidebar";

const DecoratableSidebar = makeDecoratable("Sidebar", SidebarBase);

const Sidebar = withStaticProps(DecoratableSidebar, {
    Separator: SidebarSeparator,
    Label: SidebarLabel,
    Group: SidebarGroup,
    Item: SidebarItem,
    CheckboxItem: SidebarCheckboxItem
});

export { Sidebar };
