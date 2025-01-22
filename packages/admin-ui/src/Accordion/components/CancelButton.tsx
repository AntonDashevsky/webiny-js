// No Tailwind classes to modify in this file
import * as React from "react";
import { makeDecoratable } from "~/utils";
import { AccordionClose } from "./AccordionClose";
import { Button, ButtonProps } from "~/Button";

const CancelButtonBase = (props: ButtonProps) => (
    <AccordionClose asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </AccordionClose>
);

export const CancelButton = makeDecoratable("CancelButton", CancelButtonBase);
