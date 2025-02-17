import { HandlerPayload as RenderHandlerArgs } from "~/render/types.js";
import { HandlerArgs as FlushHandlerArgs } from "~/flush/types.js";
import { QueueAddJobEvent as QueueHandlerArgs } from "~/queue/add/types.js";

export interface PrerenderingServiceClientContext {
    prerenderingServiceClient: {
        render(args: RenderHandlerArgs): Promise<void>;
        flush(args: FlushHandlerArgs): Promise<void>;
        queue: {
            add(args: QueueHandlerArgs): Promise<void>;
            process(): Promise<void>;
        };
    };
}

export interface PrerenderingServiceClientArgs {
    handlers: {
        queue: {
            add: string;
            process: string;
        };
        render: string;
        flush: string;
    };
}
