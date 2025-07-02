import { createImplementation } from "@webiny/di-container";
import { StdioService } from "~/abstractions/index.js";
import chalk from "chalk";

const LOG_COLORS = {
    info: chalk.blueBright,
    error: chalk.red,
    warn: chalk.yellow,
    success: chalk.green
} as const;

export class DefaultStdioService implements StdioService.Interface {
    success(message?: any, ...optionalParams: any[]) {
        this.log("success", message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        this.log("info", message, ...optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]) {
        this.log("warn", message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        this.log("error", message, ...optionalParams);
    }

    write(message?: any, ...optionalParams: any[]) {
        process.stdout.write(message, ...optionalParams);
    }

    newLine() {
        process.stdout.write("\n");
    }

    getStdout() {
        return process.stdout;
    }

    getStderr() {
        return process.stderr;
    }

    getStdin() {
        return process.stdin;
    }

    private log(type: keyof typeof LOG_COLORS, ...args: any[]) {
        const prefix = `webiny ${LOG_COLORS[type](type)}: `;

        const [first, ...rest] = args;
        if (typeof first === "string") {
            return console.log(prefix + this.colorizePlaceholders(type, first), ...rest);
        }
        return console.log(prefix, first, ...rest);
    }

    private colorizePlaceholders(type: keyof typeof LOG_COLORS, text: string) {
        return text.replace(/%[a-zA-Z]/g, match => {
            return LOG_COLORS[type](match);
        });
    }
}

export const stdioService = createImplementation({
    abstraction: StdioService,
    implementation: DefaultStdioService,
    dependencies: []
});
