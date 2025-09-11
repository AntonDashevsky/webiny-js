import type { FastifyReply, FastifyRequest } from "fastify";
import type { IPreHandler } from "~/PreHandler/IPreHandler.js";
import { Action } from "~/PreHandler/IPreHandler.js";
import type { HandlerOnRequestPlugin } from "~/plugins/HandlerOnRequestPlugin.js";
import { stringifyError } from "~/stringifyError.js";
import type { Context } from "~/types.js";

export class ProcessHandlerOnRequestPlugins implements IPreHandler {
    private readonly plugins: HandlerOnRequestPlugin[];

    constructor(plugins: HandlerOnRequestPlugin[]) {
        this.plugins = plugins;
    }

    async execute(request: FastifyRequest, reply: FastifyReply, context: Context): Promise<Action> {
        let name: string | undefined;
        try {
            for (const plugin of this.plugins) {
                name = plugin.name;
                const result = await plugin.exec(request, reply, context);
                if (result === false) {
                    return Action.DONE;
                }
            }
        } catch (ex) {
            console.error(
                `Error while running the "HandlerOnRequestPlugin" ${
                    name ? `(${name})` : ""
                } plugin in the onRequest hook.`
            );
            console.error(stringifyError(ex));
            throw ex;
        }

        return Action.CONTINUE;
    }
}
