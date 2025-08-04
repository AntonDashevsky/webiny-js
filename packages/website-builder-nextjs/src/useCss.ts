"use server";
import path from "path";

export async function useCss(cssFile?: string) {
    const { CSSInliner } = await import("~/CssInliner");
    const entryCss = cssFile ?? path.resolve(process.cwd(), "src/theme/theme.css");

    const inliner = new CSSInliner();
    return await inliner.load(entryCss);
}
