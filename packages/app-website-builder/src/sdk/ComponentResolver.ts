import { toJS } from "mobx";
import type { ComponentRegistry } from "~/sdk/ComponentRegistry.js";
import {
    type DocumentElement,
    type ResolvedComponent,
    SerializableCSSStyleDeclaration
} from "~/sdk/types";
import { logger } from "./Logger";

export class ComponentResolver {
    private components: ComponentRegistry;

    constructor(registry: ComponentRegistry) {
        this.components = registry;
    }

    resolve(element: DocumentElement): ResolvedComponent | null {
        const componentName = element.component.name;
        const blueprint = this.components.get(componentName);

        if (!blueprint) {
            logger.warn(`Unknown component: ${componentName}`);
            return null;
        }

        return {
            component: blueprint.component,
            inputs: element.component.inputs,
            manifest: blueprint.manifest,
            styles: this.resolveStyles(element)
        };
    }

    private resolveStyles(element: DocumentElement): SerializableCSSStyleDeclaration {
        const styles = element.styles?.["large"];

        return styles ? toJS(styles) : {};
    }
}
