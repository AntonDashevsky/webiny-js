import React from "react";
import { cn, cva, type VariantProps, makeDecoratable, withStaticProps } from "~/utils.js";
import { ItemCollapseTrigger } from "./ItemCollapseTrigger.js";
import { ItemContent } from "./ItemContent.js";
import { ItemDragHandle } from "./ItemDragHandle.js";
import { ItemIcon } from "./ItemIcon.js";
import { ItemSubIndentation } from "./ItemSubIndentation.js";
import { ItemPlaceholder } from "./ItemPlaceholder.js";

const itemVariants = cva(
    [
        "wby-group",
        "wby-relative",
        "wby-flex wby-items-center wby-justify-start wby-gap-xs",
        "wby-px-sm-plus wby-py-xs-plus wby-rounded-md",
        "wby-text-neutral-primary",
        "wby-cursor-pointer",
        "hover:wby-bg-neutral-dark/5"
    ],
    {
        variants: {
            active: {
                true: "wby-bg-neutral-dark/5 wby-font-semibold"
            },
            loading: {
                true: "!wby-text-neutral-disabled !wby-fill-neutral-disabled !wby-pointer-events-none"
            }
        }
    }
);

type ItemProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof itemVariants>;

const BaseItem = ({ children, className, active, loading, ...props }: ItemProps) => {
    return (
        <div className={"wby-mb-xs wby-px-sm"}>
            <div {...props} className={cn(itemVariants({ active, loading }), className)}>
                {children}
            </div>
        </div>
    );
};

const DecoratableItem = makeDecoratable("TreeItem", BaseItem);

const Item = withStaticProps(DecoratableItem, {
    CollapseTrigger: ItemCollapseTrigger,
    Content: ItemContent,
    DragHandle: ItemDragHandle,
    Icon: ItemIcon,
    SubIndentation: ItemSubIndentation,
    Placeholder: ItemPlaceholder
});

export { Item, type ItemProps };
