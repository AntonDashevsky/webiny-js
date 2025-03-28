import { Action, IPreHandler } from "~/PreHandler/IPreHandler.js";
import { stringifyError } from "~/stringifyError.js";
import { ContextPlugin } from "~/Context.js";
import type { Context } from "~/types.js";

export class ProcessContextPlugins implements IPreHandler {
    private readonly plugins: ContextPlugin[];
    private readonly context: Context;

    constructor(context: Context, plugins: ContextPlugin[]) {
        this.context = context;
        this.plugins = plugins;
    }

    async execute(): Promise<Action> {
        let name: string | undefined;
        try {
            for (const plugin of this.plugins) {
                name = plugin.name;
                await plugin.apply(this.context);
            }
        } catch (ex) {
            console.error(`Error running ContextPlugin "${name}".`);
            console.error(stringifyError(ex));
            throw ex;
        }

        return Action.CONTINUE;
    }
}
