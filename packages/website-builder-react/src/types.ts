import type { CssProperties, DocumentElement } from "@webiny/website-builder-sdk";

export type ComponentProps<TInputs = unknown> = {
    inputs: TInputs;
    styles: CssProperties;
    element: DocumentElement;
    breakpoint: string;
};

export type ComponentPropsWithChildren<TInputs = unknown> = ComponentProps<
    TInputs & { children: React.ReactNode }
>;

export type ExtractInputs<T> = T extends { inputs: infer I } ? I : never;

export type ExtractInputNames<T extends (props: any) => any> = keyof ExtractInputs<
    Parameters<T>[0]
>;
