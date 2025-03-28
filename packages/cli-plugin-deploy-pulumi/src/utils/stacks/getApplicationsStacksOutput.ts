import type { IStackOutput } from "~/utils/index.js";
import { getStackOutput } from "~/utils/index.js";
import { getApplicationsStacks } from "./getApplicationsStacks.js";
import type { IStack } from "./Stack.js";
import type { Context, NonEmptyArray } from "~/types.js";

export interface IGetStacksOutputParams {
    folders: NonEmptyArray<string>;
    env: string;
    variants: NonEmptyArray<string | undefined> | undefined;
    cwd?: string;
    context: Context;
}

export const getApplicationsStacksOutput = async (
    params: IGetStacksOutputParams
): Promise<Required<IStack<IStackOutput>>[]> => {
    const { context } = params;

    const initialStacks = getApplicationsStacks(params);

    const promises: Promise<void>[] = [];

    const stacks: Required<IStack<IStackOutput>>[] = [];

    for (const appStack of initialStacks) {
        for (const stack of appStack.stacks) {
            promises.push(
                new Promise<void>((resolve, reject) => {
                    try {
                        const output = getStackOutput({
                            folder: appStack.folder,
                            env: appStack.env,
                            variant: stack.variant,
                            cwd: params.cwd
                        });
                        stacks.push(stack.withOutput<IStackOutput>(output));
                        resolve();
                    } catch (ex) {
                        reject(ex);
                    }
                })
            );
        }
    }
    try {
        await Promise.all(promises);
    } catch (ex) {
        context.error(ex);
        throw ex;
    }

    return stacks;
};
