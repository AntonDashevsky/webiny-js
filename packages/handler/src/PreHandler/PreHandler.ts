import { type FastifyReply, type FastifyRequest } from "fastify";
import { Action, type IPreHandler } from "~/PreHandler/IPreHandler.js";

export class PreHandler implements IPreHandler {
    private readonly handlers: IPreHandler[];

    constructor(handlers: IPreHandler[]) {
        this.handlers = handlers;
    }

    async execute(request: FastifyRequest, reply: FastifyReply): Promise<Action> {
        for (const handler of this.handlers) {
            const action = await handler.execute(request, reply);
            if (action === Action.DONE) {
                return Action.DONE;
            }
        }

        return Action.CONTINUE;
    }
}
