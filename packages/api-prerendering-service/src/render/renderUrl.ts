import posthtml from "posthtml";
import { noopener } from "posthtml-noopener";
/**
 * Package posthtml-plugin-link-preload has no types.
 */
// @ts-expect-error
import posthtmlPluginLinkPreload from "posthtml-plugin-link-preload";
import absoluteAssetUrls from "./absoluteAssetUrls.js";
import injectApolloState from "./injectApolloState.js";
import injectRenderId from "./injectRenderId.js";
import injectRenderTs from "./injectRenderTs.js";
import injectTenantLocale from "./injectTenantLocale.js";
import injectNotFoundPageFlag from "./injectNotFoundPageFlag.js";
import getPsTags from "./getPsTags.js";
import { defaultRenderUrlFunction } from "./defaultRenderUrlFunction.js";
import { generateAlphaNumericId } from "@webiny/utils/generateId.js";
import { type RenderResult, type RenderUrlParams, type RenderUrlPostHtmlParams } from "./types.js";
import { type TagPathLink } from "~/types.js";
import { preloadJs } from "~/render/preloadJs.js";
import { preloadCss } from "~/render/preloadCss.js";
import { preloadFonts } from "~/render/preloadFonts.js";

interface Meta {
    path: string;
    id: string;
    ts: number;
    render: RenderResult;
    args: RenderUrlParams;
}

export interface File {
    type: string;
    body: any;
    name: string;
    meta: {
        tags?: TagPathLink[];
        [key: string]: any;
    };
}

export default async (url: string, args: RenderUrlParams): Promise<[File[], Meta]> => {
    const id = generateAlphaNumericId();
    const ts = new Date().getTime();

    console.log(`Rendering "${url}" (render ID: ${id})...`);

    let renderUrl = defaultRenderUrlFunction;
    if (typeof args.renderUrlFunction === "function") {
        renderUrl = args.renderUrlFunction;
    }
    const render = await renderUrl(url, args);

    // Process HTML.
    console.log("Processing HTML...");

    preloadJs(render);
    preloadCss(render);
    preloadFonts(render);

    const allArgs: RenderUrlPostHtmlParams = { render, args, path: args.args.path, id, ts };
    const { html } = await posthtml([
        noopener(),
        absoluteAssetUrls(),
        posthtmlPluginLinkPreload(),
        injectRenderId(allArgs),
        injectRenderTs(allArgs),
        injectApolloState(allArgs),
        injectTenantLocale(allArgs),
        injectNotFoundPageFlag(allArgs)
    ]).process(render.content);

    console.log("Processing HTML done.");

    console.log(`Rendering "${url}" completed.`);

    // TODO: should be plugins.
    return [
        [
            {
                name: "index.html",
                body: html,
                type: "text/html",
                meta: {
                    tags: getPsTags(html)
                }
            },
            {
                name: "cache.json",
                body: JSON.stringify(render.meta.cachedData),
                type: "application/json",
                meta: {}
            }
        ],
        allArgs
    ];
};
