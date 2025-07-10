import { createImplementation } from "@webiny/di-container";
import { ExtensionDefinitionFactory } from "~/abstractions/features";

export class CliCommandDefinition implements ExtensionDefinitionFactory.Interface {
    execute() {
        return {
            type: "cliCommand",
            build: () => Promise.resolve(),
            validate: () => {}
        };
    }
}

export const cliCommandDefinition = createImplementation({
    abstraction: ExtensionDefinitionFactory,
    implementation: CliCommandDefinition,
    dependencies: []
});
