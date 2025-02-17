import type { ITimer } from "./abstractions/ITimer.js";
import { CustomTimer } from "./CustomTimer.js";
import type { Context as LambdaContext } from "@webiny/aws-sdk/types/index.js";
import { Timer } from "./Timer.js";

export type ITimerFactoryParams = Pick<LambdaContext, "getRemainingTimeInMillis">;

export const timerFactory = (params?: Partial<ITimerFactoryParams>): ITimer => {
    const customTimer = new CustomTimer();

    return new Timer(() => {
        if (params?.getRemainingTimeInMillis) {
            return params.getRemainingTimeInMillis();
        }
        return customTimer.getRemainingMilliseconds();
    });
};
