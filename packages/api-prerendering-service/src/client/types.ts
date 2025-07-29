import type { HandlerPayload as RenderHandlerArgs } from "~/render/types";
import type { HandlerArgs as FlushHandlerArgs } from "~/flush/types";
import type { QueueAddJobEvent as QueueHandlerArgs } from "~/queue/add/types";

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
