import type { FastifyReply, FastifyRequest } from "fastify";
import type { Context } from "~/types.js";

export enum Action {
    CONTINUE = "continue",
    DONE = "done"
}

export interface IPreHandler {
    execute(
        request: FastifyRequest,
        reply: FastifyReply,
        context: Context
    ): Promise<Action> | Action;
}
