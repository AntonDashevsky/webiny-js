import chalk from "chalk";
import util from "util";

export class GracefulError extends Error {
    static from(cause: Error, ...message: string[]): GracefulError;
    static from(...message: string[]): GracefulError;

    static from(causeOrMessage: Error | string, ...message: string[]): GracefulError {
        if (causeOrMessage instanceof Error) {
            const formattedMessage = this.formatMessage(...message);
            return new GracefulError(formattedMessage, { cause: causeOrMessage });
        }

        const formattedMessage = this.formatMessage(...[causeOrMessage, ...message]);
        return new GracefulError(formattedMessage);
    }

    private static formatMessage(...message: string[]): string {
        const [text, ...args] = message;
        // Replace all placeholders (match with `/%[a-zA-Z]/g` regex) with colorized values.
        const messageWithColorizedPlaceholders = text.replace(/%[a-zA-Z]/g, match => {
            return chalk.cyan(match);
        });

        return util.format(messageWithColorizedPlaceholders, ...args);
    }
}
