import * as React from "react";
import { cn } from "~/utils";
import { type AccordionProps } from "../Accordion";
import { AccordionTitle } from "./AccordionTitle";
import { AccordionDescription } from "./AccordionDescription";
import { ReactComponent as XIcon } from "@material-design-icons/svg/filled/close.svg";
import { IconButton } from "~/Button";
import * as AccordionPrimitive from "@radix-ui/react-Accordion";

export type AccordionHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
    Pick<AccordionProps, "title" | "icon" | "description" | "showCloseButton">;

export const AccordionHeader = ({
    title,
    icon,
    description,
    showCloseButton,
    className,
    ...props
}: AccordionHeaderProps) => {
    if (!title && !description) {
        return null;
    }

    return (
        <div
            {...props}
            className={cn(
                "wby-flex wby-flex-col wby-gap-sm wby-px-lg wby-py-md wby-text-center sm:wby-text-left wby-text-neutral-primary",
                className
            )}
        >
            <div className={"wby-relative"}>
                {showCloseButton !== false && (
                    <AccordionPrimitive.Close asChild className="wby-absolute wby-right-0 wby-top-0">
                        <IconButton size="md" iconSize="lg" variant={"ghost"} icon={<XIcon />} />
                    </AccordionPrimitive.Close>
                )}
                <AccordionTitle>
                    {icon}
                    {title}
                </AccordionTitle>
            </div>
            <AccordionDescription>{description}</AccordionDescription>
        </div>
    );
};
