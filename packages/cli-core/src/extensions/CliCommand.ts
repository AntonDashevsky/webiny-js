import { createExtension } from "@webiny/project";
import fs from "fs";
import path from "path";
import { Metadata } from "@webiny/di-container";
import { Command } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const cliCommand = createExtension<CliCommandParams>({
    type: "cliCommand",
    description: "An extension for defining CLI commands.",
    array: true,
    build: params => {
        console.log("building", params);
    },
    validate: async params => {
        if (!fs.existsSync(params.src)) {
            throw new Error(
                `Source file for CLI command "${params.name}" does not exist: ${params.src}`
            );
        }

        const filePath = path.resolve(process.cwd(), params.src);
        const { default: ImportedCommand } = await import(filePath);
        if (typeof ImportedCommand !== "function") {
            throw new Error(
                `Source file for CLI command "${params.name}" must export a Command class.`
            );
        }

        const metadata = new Metadata(ImportedCommand);
        const isCorrectAbstraction = metadata.getAbstraction() === Command;
        if (!isCorrectAbstraction) {
            throw new Error(
                `Source file for CLI command "${params.name}" must export a Command implementation.`
            );
        }
    }
});
