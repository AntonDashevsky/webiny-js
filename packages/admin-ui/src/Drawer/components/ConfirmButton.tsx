import * as React from "react";
import { makeDecoratable } from "~/utils";
import type { ButtonProps } from "~/Button";
import { Button } from "~/Button";

const ConfirmButtonBase = (props: ButtonProps) => (
    <Button text={"Confirm"} {...props} variant="primary" />
);

export const ConfirmButton = makeDecoratable("ConfirmButton", ConfirmButtonBase);
