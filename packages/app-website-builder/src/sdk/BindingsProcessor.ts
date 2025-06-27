import { DocumentElementBindings, CssProperties } from "~/sdk/types";

type RequiredBindings<T extends DocumentElementBindings> = T & {
    inputs: NonNullable<T["inputs"]>;
    styles: NonNullable<T["styles"]>;
};

export type InheritanceInfo = {
    inputs: {
        [path: string]: {
            overridden: boolean;
            inheritedFrom?: string;
        };
    };
    styles: {
        [path: string]: {
            overridden: boolean;
            inheritedFrom?: string;
        };
    };
};

export class BindingsProcessor {
    private readonly breakpoints: string[];

    constructor(breakpoints: string[]) {
        this.breakpoints = breakpoints;
    }

    public getBindings(bindings: DocumentElementBindings, breakpoint: string) {
        const result: RequiredBindings<DocumentElementBindings> = {
            $repeat: bindings.$repeat,
            inputs: { ...(bindings.inputs || {}) },
            styles: { ...(bindings.styles || {}) }
        };

        const inheritanceInfo: InheritanceInfo = {
            inputs: {},
            styles: {}
        };

        const overrides = bindings.overrides ?? {};

        let upTo = this.breakpoints.indexOf(breakpoint);
        if (upTo === -1) {
            upTo = 0;
        }

        for (let i = 0; i <= upTo; i++) {
            const bp = this.breakpoints[i];
            const override = overrides[bp];
            if (!override) {
                continue;
            }

            if (override.inputs) {
                for (const key in override.inputs) {
                    result.inputs[key] = {
                        ...(result.inputs![key] || {}),
                        ...override.inputs[key]
                    };
                }
            }

            if (override.styles) {
                for (const styleKey in override.styles) {
                    const key = styleKey as keyof CssProperties;
                    // @ts-expect-error It's hard to make CSS properties happy.
                    result.styles[key] = {
                        ...(result.styles[key] || {}),
                        ...override.styles[key]
                    };
                }
            }
        }

        const currentBp = breakpoint;
        const currentBpIndex = this.breakpoints.indexOf(currentBp);
        for (const styleKey in result.styles) {
            // Check if overridden at current breakpoint
            const overridden =
                currentBpIndex === 0
                    ? true // Base breakpoint styles are always overridden
                    : overrides[currentBp]?.styles?.hasOwnProperty(styleKey) ?? false;

            // Find the nearest ancestor breakpoint that defines this style
            let inheritedFrom: string | undefined = undefined;
            for (let i = currentBpIndex - 1; i >= 0; i--) {
                const ancestorBp = this.breakpoints[i];
                if (ancestorBp === this.breakpoints[0]) {
                    inheritedFrom = ancestorBp;
                    break;
                } else if (overrides[ancestorBp]?.styles?.hasOwnProperty(styleKey)) {
                    inheritedFrom = ancestorBp;
                    break;
                } else {
                    inheritedFrom = this.breakpoints[0];
                }
            }

            if (overridden && inheritedFrom === currentBp) {
                inheritedFrom = undefined;
            }

            // Assign inheritance info
            inheritanceInfo.styles[styleKey] = {
                overridden,
                inheritedFrom
            };
        }

        return { bindings: result, inheritanceInfo };
    }
}
