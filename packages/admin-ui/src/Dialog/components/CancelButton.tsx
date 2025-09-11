import * as React from "react";
import { makeDecoratable } from "~/utils.js";
import { DialogClosePrimitive } from "./DialogClose.js";
import type { ButtonProps } from "~/Button/index.js";
import { Button } from "~/Button/index.js";

const CancelButtonBase = (props: ButtonProps) => (
    <DialogClosePrimitive asChild>
        <Button text={"Cancel"} {...props} variant="secondary" />
    </DialogClosePrimitive>
);

export const CancelButton = makeDecoratable("CancelButton", CancelButtonBase);
