import * as React from "react";
import { ReactComponent as ChevronUp } from "@material-design-icons/svg/outlined/keyboard_arrow_up.svg";
import * as SelectPrimitives from "@radix-ui/react-select";
import { cn } from "~/utils";

type SelectScrollUpButtonProps = SelectPrimitives.SelectScrollUpButtonProps;

const SelectScrollUpButton = ({ className, ...props }: SelectScrollUpButtonProps) => (
    <SelectPrimitives.ScrollUpButton
        className={cn(
            "wby-flex wby-cursor-default wby-items-center wby-justify-center wby-pb-sm wby-fill-neutral-xstrong",
            className
        )}
        {...props}
    >
        <ChevronUp className="wby-h-md wby-w-md" />
    </SelectPrimitives.ScrollUpButton>
);

export { SelectScrollUpButton, type SelectScrollUpButtonProps };
