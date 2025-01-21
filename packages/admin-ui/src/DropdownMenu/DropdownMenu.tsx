import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DropdownMenuRoot } from "./components/DropdownMenuRoot";
import { DropdownMenuTrigger } from "./components/DropdownMenuTrigger";
import { DropdownMenuContent } from "./components/DropdownMenuContent";
import { DropdownMenuSeparator } from "./components/DropdownMenuSeparator";
import { DropdownMenuItem } from "./components/DropdownMenuItem";
import { DropdownMenuCheckboxItem } from "./components/DropdownMenuCheckboxItem";
import { DropdownMenuLabel } from "./components/DropdownMenuLabel";
import { DropdownMenuGroup } from "./components/DropdownMenuGroup";
import { DropdownMenuPortal } from "./components/DropdownMenuPortal";

interface DropdownMenuProps
    extends React.ComponentPropsWithoutRef<typeof DropdownMenuRoot>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {
    trigger?: React.ReactNode;
    children: React.ReactNode;
}

const DropdownMenuBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuRoot>,
    DropdownMenuProps
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
        <DropdownMenuRoot {...rootProps}>
            {triggerProps.children && <DropdownMenuTrigger {...triggerProps} asChild />}
            <DropdownMenuPortal>
                <DropdownMenuContent {...contentProps} ref={ref} />
            </DropdownMenuPortal>
        </DropdownMenuRoot>
    );
});

DropdownMenuBase.displayName = "DropdownMenu";

const DecoratableDropdownMenu = makeDecoratable("DropdownMenu", DropdownMenuBase);

const DropdownMenu = withStaticProps(DecoratableDropdownMenu, {
    Separator: DropdownMenuSeparator,
    Label: DropdownMenuLabel,
    Group: DropdownMenuGroup,
    Item: DropdownMenuItem,
    CheckboxItem: DropdownMenuCheckboxItem
});

export { DropdownMenu };
