import * as React from "react";
import { makeDecoratable } from "~/utils";
import { DialogClosePrimitive } from "./DialogClose";
import type { ButtonProps } from "~/Button";
import { Button } from "~/Button";

const CancelButtonBase = (props: ButtonProps) => (
    <DialogClosePrimitive asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </DialogClosePrimitive>
);

export const CancelButton = makeDecoratable("CancelButton", CancelButtonBase);
