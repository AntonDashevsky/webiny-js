import type { FastifyReply, FastifyRequest } from "fastify";
import { Action, IPreHandler } from "~/PreHandler/IPreHandler";
import { HandlerOnRequestPlugin } from "~/plugins/HandlerOnRequestPlugin";
import { stringifyError } from "~/stringifyError";

export class ProcessHandlerOnRequestPlugins implements IPreHandler {
    private readonly plugins: HandlerOnRequestPlugin[];

    constructor(plugins: HandlerOnRequestPlugin[]) {
        this.plugins = plugins;
    }

    async execute(request: FastifyRequest, reply: FastifyReply): Promise<Action> {
        let name: string | undefined;
        try {
            for (const plugin of this.plugins) {
                name = plugin.name;
                const result = await plugin.exec(request, reply);
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
