import { createHandler } from "~/fastify.js";
import { createModifyFastifyPlugin } from "~/plugins/ModifyFastifyPlugin.js";

interface ModifiedApp {
    modifiedValue?: boolean;
}

describe("modify fastify with plugin", () => {
    it("should modify existing Fastify instance via the plugin", async () => {
        const app = createHandler({
            plugins: [
                createModifyFastifyPlugin(instance => {
                    (instance as ModifiedApp).modifiedValue = true;
                })
            ]
        });

        expect((app as ModifiedApp).modifiedValue).toEqual(true);
    });
});
