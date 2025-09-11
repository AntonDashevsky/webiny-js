import { getStackOutput } from "@webiny/project";
import type { IGetSyncSystemOutputResult } from "~/pulumi/apps/syncSystem/types.js";

export interface IGetSyncSystemOutputParams {
    env: string;
}

export const getSyncSystemOutput = (params: IGetSyncSystemOutputParams) => {
    return getStackOutput<IGetSyncSystemOutputResult>({
        env: params.env,
        /**
         * Sync System cannot have a variant, only env.
         */
        variant: undefined,
        app: "sync"
    });
};

export const asyncGetSyncSystemOutput = async (
    params: IGetSyncSystemOutputParams
): Promise<IGetSyncSystemOutputResult> => {
    const value = await getSyncSystemOutput(params);
    return value!;
};
