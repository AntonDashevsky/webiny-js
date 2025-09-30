import { Container, type Abstraction } from "@webiny/di-container";

export interface FeatureDefinition<TExports = any> {
    name: string;
    tokens: Record<string, Abstraction<any>>; // or `abstractions`
    register(container: Container): void;
    init: (container: Container) => TExports;
}

export function createFeature<TExports = any>(def: {
    name: string;
    tokens: Record<string, Abstraction<any>>;
    register(container: Container): void;
    init(container: Container): TExports;
}): FeatureDefinition<TExports> {
    const registeredContainers = new WeakSet<Container>();

    return {
        name: def.name,
        tokens: def.tokens,
        register: def.register,

        init: (container: Container): TExports => {
            if (!registeredContainers.has(container)) {
                def.register(container);
                registeredContainers.add(container);
            }
            return def.init(container);
        }
    };
}
