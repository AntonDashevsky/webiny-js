import { Container } from "@webiny/di-container";

export interface FeatureDefinition<TExports = any, TParams extends any[] = []> {
    name: string;
    register: (container: Container, ...args: TParams) => void;
    init: (container: Container) => TExports;
}

export function createFeature<
    TExports = any,
    TParams extends any[] = [] // tuple for extra args
>(def: {
    name: string;
    register: (container: Container, ...args: TParams) => void;
    init: (container: Container) => TExports;
}): FeatureDefinition<TExports, TParams> {
    return {
        name: def.name,
        register: def.register,
        init: (container: Container): TExports => {
            return def.init(container);
        }
    };
}
