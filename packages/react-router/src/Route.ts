import { z } from "zod";

export type RouteParamsDefinition = Record<string, z.ZodTypeAny>;

export type RouteParamsInfer<TParams extends RouteParamsDefinition> = z.infer<
    z.ZodObject<TParams>
> & { [k: string]: any };

export interface RouteParams<TParams extends RouteParamsDefinition | undefined> {
    name: string;
    path: `/${string}` | `*`;
    params?: (zod: typeof z) => TParams;
}

export class Route<TParams extends RouteParamsDefinition | undefined = undefined> {
    private readonly route: RouteParams<TParams>;
    private readonly schema: TParams extends RouteParamsDefinition
        ? RouteParamsInfer<TParams>
        : undefined;

    constructor(route: RouteParams<TParams>) {
        this.route = route;
        const paramsSchema = route.params ? route.params(z) : undefined;
        this.schema = paramsSchema ? (z.object(paramsSchema).passthrough() as any) : undefined;
    }

    get name() {
        return this.route.name;
    }

    get path() {
        return this.route.path;
    }

    get params(): TParams extends RouteParamsDefinition ? RouteParamsInfer<TParams> : undefined {
        return this.schema as any;
    }
}
