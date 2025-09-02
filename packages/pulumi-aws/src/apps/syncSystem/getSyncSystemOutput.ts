import { getStackOutput } from "@webiny/project";
import type { IGetSyncSystemOutputResult } from "~/apps/syncSystem/types.js";

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
    return new Promise(async resolve => {
        const value = await getSyncSystemOutput(params);

        return resolve(value!);
    });
};
