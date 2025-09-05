import { sendEvent } from "@webiny/telemetry/cli.js";

export class Analytics {
    track(stage, properties) {
        const event = this.getEventName(stage);
        return sendEvent({ event, properties });
    }

    getEventName(stage) {
        return `cli-create-webiny-project-${stage}`;
    }
}
