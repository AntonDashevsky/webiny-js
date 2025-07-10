import { createConfigurableComponent } from "@webiny/react-properties";
import { CliCommandComponent } from "./CliCommand/CliCommandComponent";

const base = createConfigurableComponent("Cli");

export const Cli = Object.assign(base.Config, {
    Command: CliCommandComponent
});
