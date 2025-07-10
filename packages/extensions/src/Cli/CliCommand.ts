import { createExtension } from "~/utils/createExtension";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const cliCommand = createExtension<CliCommandParams>({
    type: "cliCommand",
    description: "An extension for defining CLI commands.",
    array: true,
    build: (params) => {
        console.log('building', params)
    },
    validate: (params) => {
        console.log('validating', params);
    }
});
