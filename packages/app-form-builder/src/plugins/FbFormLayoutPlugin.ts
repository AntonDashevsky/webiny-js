import { Plugin } from "@webiny/plugins";
import type { FbFormLayout } from "~/types";

export class FbFormLayoutPlugin extends Plugin {
    public static override readonly type: string = "form-layout";
    public readonly layout: FbFormLayout;

    public constructor(layout: FbFormLayout) {
        super();
        this.layout = layout;
    }
}
