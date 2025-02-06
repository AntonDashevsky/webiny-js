import React, { useMemo } from "react";
import { ListItem } from "../List";
import { Accordion as AdminUiAccordion } from "@webiny/admin-ui";
import { withStaticProps } from "@webiny/admin-ui/utils";

export interface AccordionItemProps {
    /**
     * Element displayed when accordion is expanded.
     */
    children:
        | React.ReactElement<typeof ListItem>[]
        | React.ReactElement<typeof AccordionItem>
        | React.ReactElement<typeof AccordionItem>[];

    /**
     * Elevation number, default set to 2
     */
    elevation?: number;

    /**
     * Append a class name
     */
    className?: string;
}

const AccordionItemBase = (props: any) => {
    const value = useMemo(() => {
        return props.value || props.title;
    }, [props.value, props.title]);

    const icon = useMemo(() => {
        return props.icon ? <AdminUiAccordion.Item.Icon icon={props.icon} /> : null;
    }, [props.icon]);

    return <AdminUiAccordion.Item {...props} value={value} icon={icon} />;
};

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Accordion.Item` component from the `@webiny/admin-ui` package instead.
 */
export const AccordionItem = withStaticProps(AccordionItemBase, {
    Divider: AdminUiAccordion.Item.Action.Separator,
    Action: AdminUiAccordion.Item.Action,
    Icon: AdminUiAccordion.Item.Icon,
    Actions: (props: any) => <>{props.children}</>,
    Element: (props: any) => <div data-role={"accordion-element"} {...props} />
});
