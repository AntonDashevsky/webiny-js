import { createImplementation } from "@webiny/di-container";
import { UiService, StdioService } from "~/abstractions/index.js";
import chalk from "chalk";

const NEW_LINE = "\n";

const LOG_COLORS = {
    info: chalk.blueBright,
    error: chalk.red,
    warning: chalk.yellow,
    success: chalk.green
} as const;

export class DefaultUiService implements UiService.Interface {
    constructor(private readonly stdio: StdioService.Interface) {
        this.stdio = stdio;
    }

    text(message?: any, ...optionalParams: any[]) {
        this.stdio.getStdout().write(message, ...optionalParams);
        this.newLine();
    }

    newLine() {
        this.stdio.getStdout().write("\n");
    }

    // The following methods are used to print messages with a specific type prefix.

    success(message?: any, ...optionalParams: any[]) {
        this.textWithTypePrefix("success", message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        this.textWithTypePrefix("info", message, ...optionalParams);
    }

    warning(message?: any, ...optionalParams: any[]) {
        this.textWithTypePrefix("warning", message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        this.textWithTypePrefix("error", message, ...optionalParams);
    }

    raw(message?: any, ...optionalParams: any[]) {
        this.stdio.getStdout().write(message, ...optionalParams);
    }

    private textWithTypePrefix(type: keyof typeof LOG_COLORS, ...args: any[]) {
        const prefix = `webiny ${LOG_COLORS[type](type)}: `;

        const [first, ...rest] = args;
        if (typeof first === "string") {
            const textWithColorizedPlaceholders = this.colorizePlaceholders(type, first);
            return this.text(prefix + textWithColorizedPlaceholders, ...rest);
        }
        return this.text(prefix, first, ...rest);
    }

    private colorizePlaceholders(type: keyof typeof LOG_COLORS, text: string) {
        return text.replace(/%[a-zA-Z]/g, match => {
            return LOG_COLORS[type](match);
        });
    }
}

export const uiService = createImplementation({
    abstraction: UiService,
    implementation: DefaultUiService,
    dependencies: [StdioService]
});
