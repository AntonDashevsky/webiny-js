import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import type { IconButtonProps as IconButtonProps } from "~/Button";
import { IconButton } from "~/Button";
import { ListItemSeparator } from "./ListItemSeparator";

type ListItemActionProps = IconButtonProps;

const DecoratableListItemAction = (props: ListItemActionProps) => {
    return <IconButton variant={"ghost"} size={"sm"} {...props} />;
};

const ListItemAction = withStaticProps(
    makeDecoratable("ListItemAction", DecoratableListItemAction),
    {
        Separator: ListItemSeparator
    }
);

export { ListItemAction, type ListItemActionProps };
