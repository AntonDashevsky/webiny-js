import set from "lodash/set";
import unset from "lodash/unset";
import * as fjp from "fast-json-patch";
import type { DocumentElementBindings } from "~/sdk/types";
import { InheritedValueResolver } from "~/sdk/InheritedValueResolver";

type DeepBindings = Record<string, any>;
type FlatBindings = Record<string, Record<string, any>>;

/**
 * Handles deep-to-flat and flat-to-deep conversion of style bindings,
 * with breakpoint inheritance awareness.
 */
export class StylesBindingsProcessor {
    private breakpoints: string[];
    private rawBindings: DocumentElementBindings;

    constructor(breakpoints: string[], rawBindings: DocumentElementBindings) {
        this.breakpoints = breakpoints;
        this.rawBindings = rawBindings;
    }

    /**
     * Converts flat style bindings into deep styles object (removes `.static`).
     */
    public toDeepStyles(styles: DocumentElementBindings["styles"] = {}): DeepBindings {
        const result: DeepBindings = {};
        Object.keys(styles).forEach(key => {
            // @ts-expect-error Style keys cannot be indexed with a string.
            result[key] = styles[key].static;
        });
        return result;
    }

    /**
     * Flattens deep styles object into flat bindings with `.static` wrappers.
     * Skips overrides where the value matches inherited parent breakpoint.
     *
     * @param rebuilt - The object to store flattened styles
     * @param styles - The deep styles to flatten
     * @param currentBreakpoint - The breakpoint for which overrides are being flattened
     */
    public applyStyles(
        rebuilt: FlatBindings,
        styles: DeepBindings,
        currentBreakpoint: string
    ): void {
        const valueResolver = new InheritedValueResolver(this.breakpoints, breakpoint => {
            if (this.isBaseBreakpoint(breakpoint)) {
                return this.rawBindings.styles;
            }
            return this.rawBindings?.overrides?.[breakpoint]?.styles;
        });

        // Collect original keys for the breakpoint
        const originalStyles = this.isBaseBreakpoint(currentBreakpoint)
            ? this.rawBindings.styles || {}
            : this.rawBindings?.overrides?.[currentBreakpoint]?.styles || {};

        const newKeys = new Set(Object.keys(styles));
        const originalKeys = Object.keys(originalStyles);

        // Remove keys that no longer exist
        for (const key of originalKeys) {
            if (!newKeys.has(key)) {
                if (this.isBaseBreakpoint(currentBreakpoint)) {
                    unset(rebuilt, `styles.${key}`);
                } else {
                    unset(rebuilt, `overrides.${currentBreakpoint}.styles.${key}`);
                }
            }
        }

        for (const [key, value] of Object.entries(styles)) {
            if (this.isBaseBreakpoint(currentBreakpoint)) {
                set(rebuilt, `styles.${key}.static`, value);
            } else {
                const inheritedValue = valueResolver.getInheritedValue(key, currentBreakpoint);

                if (value !== inheritedValue) {
                    set(rebuilt, `overrides.${currentBreakpoint}.styles.${key}.static`, value);
                } else {
                    unset(rebuilt, `overrides.${currentBreakpoint}.styles.${key}`);
                }
            }
        }
    }

    public createPatch(
        baseBindings: DocumentElementBindings, // current flat bindings for this breakpoint
        updatedStyles: DeepBindings,                      // new deep styles to apply
        currentBreakpoint: string
    ): fjp.Operation[] {
        // Step 1: Prepare an empty object to hold the flattened updated styles
        const updatedFlattenedBindings: Record<string, any> = structuredClone(baseBindings);

        // Step 2: Use existing applyStyles method to fill updatedFlattenedBindings with breakpoint-aware flattened styles
        this.applyStyles(updatedFlattenedBindings, updatedStyles, currentBreakpoint);

        // Step 3: Use fast-json-patch to get a patch that transforms baseBindings into updatedFlattenedBindings
        // Note: baseBindings might be undefined if no styles set yet, so default to {}
        const patch = fjp.compare(baseBindings || {}, updatedFlattenedBindings);

        return patch;
    }

    private isBaseBreakpoint(name: string): boolean {
        return this.breakpoints.indexOf(name) === 0;
    }
}
