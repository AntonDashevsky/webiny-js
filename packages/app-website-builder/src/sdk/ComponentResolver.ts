import type { ComponentRegistry } from "~/sdk/ComponentRegistry.js";
import type {
    DocumentBindings,
    DocumentElement,
    DocumentState,
    ResolvedComponent
} from "~/sdk/types";
import { logger } from "./Logger";
import { BindingsResolver } from "./BindingsResolver";

export class ComponentResolver {
    private components: ComponentRegistry;

    constructor(registry: ComponentRegistry) {
        this.components = registry;
    }

    resolve(
        element: DocumentElement,
        state: DocumentState,
        bindings: DocumentBindings,
        displayMode: string
    ): ResolvedComponent[] | null {
        const componentName = element.component.name;
        const blueprint = this.components.get(componentName);

        if (!blueprint) {
            logger.warn(`Unknown component: ${componentName}`);
            return null;
        }

        const bindingsResolver = new BindingsResolver(state, bindings, displayMode);
        const instances = bindingsResolver.resolveElement(element);

        return instances.map(instance => ({
            component: blueprint.component,
            manifest: blueprint.manifest,
            styles: instance.styles,
            inputs: instance.component.inputs
        }));
    }
}
