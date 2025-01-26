import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { makeDecoratable } from "~/utils";
import { AccordionItemProps } from "./AccordionItem";
import { AccordionItemAction } from "./AccordionItemAction";

type AccordionTriggerProps = Pick<AccordionItemProps, "title" | "description" | "icon" | "actions">;

const AccordionTriggerBase = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
>(({ title, description, actions, icon }, ref) => {
    return (
        <AccordionPrimitive.Trigger asChild ref={ref}>
            <div
                className={
                    "wby-flex wby-justify-between wby-items-center wby-px-md-extra wby-py-sm-extra wby-border-b-sm wby-border-b-neutral-dimmed wby-transition-all wby-cursor-pointer [&[data-state=open]>svg]:wby-rotate-180"
                }
            >
                {icon && <div className={"wby-mr-md-plus"}>{icon}</div>}
                <div className={"wby-flex wby-flex-col wby-gap-xxs wby-flex-grow"}>
                    <div className={"wby-text-md wby-font-semibold"}>{title}</div>
                    <div className={"wby-text-sm wby-text-neutral-strong"}>{description}</div>
                </div>
                <div className={"wby-flex wby-ml-3xl"}>
                    {actions}
                    <AccordionItemAction.Separator />
                    <AccordionItemAction
                        icon={
                            <ChevronDown className="wby-h-4 wby-w-4 wby-shrink-0 wby-transition-transform wby-duration-200" />
                        }
                    />
                </div>
            </div>
        </AccordionPrimitive.Trigger>
    );
});
AccordionTriggerBase.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionTrigger = makeDecoratable("AccordionTrigger", AccordionTriggerBase);
