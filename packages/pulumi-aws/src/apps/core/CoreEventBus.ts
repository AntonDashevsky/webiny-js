import * as aws from "@pulumi/aws";
import type { PulumiApp } from "@webiny/pulumi";
import { createAppModule } from "@webiny/pulumi";

export const CoreEventBus = createAppModule({
    name: "CoreEventBus",
    config(app: PulumiApp) {
        return app.addResource(aws.cloudwatch.EventBus, {
            name: "event-bus",
            config: {}
        });
    }
});
