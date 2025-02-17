import type { PbRenderElementPlugin as BasePbRenderElementPlugin } from "~/types.js";
import { legacyPluginToReactComponent } from "@webiny/app/utils/index.js";

interface PbRenderElementPluginProps extends Pick<BasePbRenderElementPlugin, "elementType"> {
    renderer: BasePbRenderElementPlugin["render"];
}

export const PbRenderElementPlugin = legacyPluginToReactComponent<PbRenderElementPluginProps>({
    pluginType: "pb-render-page-element",
    componentDisplayName: "PbRenderElementPlugin",
    mapProps: props => {
        return {
            ...props,
            render: props.renderer
        };
    }
});
