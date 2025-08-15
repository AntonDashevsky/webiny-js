import type { Container } from "@webiny/di-container";

export interface FeatureDefinition<TAbstractions, TRegister> {
    name: string;
    abstractions: TAbstractions;
    register(container: Container, context?: TRegister): void;
}

export function createFeature<TAbstractions, TRegister>(def: {
    name: string;
    abstractions: TAbstractions;
    register(container: Container, context?: TRegister): void;
}): FeatureDefinition<TAbstractions, TRegister> {
    return {
        name: def.name,
        abstractions: def.abstractions,
        register: def.register
    };
}
