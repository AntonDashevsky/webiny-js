import type { FastifyReply, FastifyRequest } from "fastify";
import type { IPreHandler } from "~/PreHandler/IPreHandler.js";
import { Action } from "~/PreHandler/IPreHandler.js";
import type { Context } from "~/types.js";

export class PreHandler implements IPreHandler {
    private readonly handlers: IPreHandler[];

    constructor(handlers: IPreHandler[]) {
        this.handlers = handlers;
    }

    async execute(request: FastifyRequest, reply: FastifyReply, context: Context): Promise<Action> {
        for (const handler of this.handlers) {
            const action = await handler.execute(request, reply, context);
            if (action === Action.DONE) {
                return Action.DONE;
            }
        }

        return Action.CONTINUE;
    }
}
