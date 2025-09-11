import type { RichTextContents } from "~/plugins/index.js";
import { CmsRichTextRendererPlugin } from "~/plugins/index.js";
import type { CmsContext } from "~/types/index.js";
import { RichTextPluginsProcessor } from "~/graphqlFields/richText/RichTextPluginsProcessor.js";

export class RichTextRenderer {
    private renderersMap = new Map<string, RichTextPluginsProcessor>();
    private plugins: CmsRichTextRendererPlugin[] = [];

    private constructor(plugins: CmsRichTextRendererPlugin[]) {
        this.plugins = plugins;
    }

    static create(context: CmsContext) {
        const rendererPlugins = context.plugins.byType<CmsRichTextRendererPlugin>(
            CmsRichTextRendererPlugin.type
        );
        return new RichTextRenderer(rendererPlugins);
    }

    async render(format: string, contents: RichTextContents) {
        const renderer = this.getRendererByType(format);

        return renderer.render(contents);
    }

    private getRendererByType(format: string) {
        if (!this.renderersMap.has(format)) {
            const plugins = this.plugins.filter(plugin => plugin.format === format);

            this.renderersMap.set(format, new RichTextPluginsProcessor(plugins));
        }

        return this.renderersMap.get(format) as RichTextPluginsProcessor;
    }
}
