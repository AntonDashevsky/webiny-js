import { type NodeAPI } from "posthtml";
import { type RenderUrlPostHtmlParams } from "~/render/types.js";

export default ({ ts }: Pick<RenderUrlPostHtmlParams, "ts">) =>
    async (tree: NodeAPI) => {
        console.log("Injecting render timestamp (__PS_RENDER_TS__) into HTML.");

        tree.match({ tag: "head" }, node => {
            if (!node.content) {
                node.content = [];
            }
            node.content.push(`<script>window.__PS_RENDER_TS__ = "${ts}";</script>`);
            return node;
        });
    };
