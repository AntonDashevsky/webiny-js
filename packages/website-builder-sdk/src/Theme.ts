import deepMerge from "deepmerge";
import {
    Breakpoint,
    WebsiteBuilderTheme,
    WebsiteBuilderThemeInput
} from "~/types/WebsiteBuilderTheme";
import { defaultBreakpoints } from "~/defaultBreakpoints";
import { createLexicalTheme } from "~/lexical/createLexicalTheme";

export class Theme {
    static from(input: WebsiteBuilderThemeInput): WebsiteBuilderTheme {
        const { custom = {}, ...builtInOverrides } = input?.breakpoints ?? {};

        const mergedBreakpoints = deepMerge.all([
            {},
            defaultBreakpoints,
            builtInOverrides,
            custom
        ]) as WebsiteBuilderThemeInput["breakpoints"];

        const breakpoints: Breakpoint[] = [];
        Object.entries(mergedBreakpoints ?? {}).forEach(([name, breakpoint]) => {
            breakpoints.push({
                name,
                ...(breakpoint as Omit<Breakpoint, "name">)
            });
        });

        return {
            themeUrl: input?.themeUrl,
            breakpoints: breakpoints.sort((a, b) => b.maxWidth - a.maxWidth),
            lexical: createLexicalTheme(input?.lexical),
            styles: {
                colors: {
                    ...input?.styles?.colors
                },
                typography: {
                    ...input?.styles?.typography
                }
            }
        };
    }
}
