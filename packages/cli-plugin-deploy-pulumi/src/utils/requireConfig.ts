import type { CliContext } from "@webiny/cli/types";

export interface IRequireConfigOptions {
    env: string;
    variant: string | undefined;
    region: string | undefined;
    debug?: boolean;
    cwd: string;
}

export interface IRequireConfigResult {
    commands: {
        build: (options: IRequireConfigOptions) => Promise<void>;
        watch: (options: IRequireConfigOptions, context: CliContext) => Promise<void>;
    };
}

export interface IRequireConfigParams {
    [key: string]: Record<string, any>;
}

export const requireConfig = async <T extends IRequireConfigResult = IRequireConfigResult>(
    input: string
): Promise<T> => {
    return await import(input).then(m => m.default ?? m);
};

export const requireConfigWithExecute = async <
    T extends IRequireConfigResult = IRequireConfigResult
>(
    input: string,
    params: IRequireConfigParams
): Promise<T> => {
    const required = await import(input).then(m => m.default ?? m);

    if (typeof required === "function") {
        return required(params);
    }

    return required;
};
