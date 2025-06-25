import type { CssProperties, DocumentElement } from "~/sdk/types";

export type ComponentProps<TInputs = unknown> = {
    inputs: TInputs;
    styles: CssProperties;
    element: DocumentElement;
    breakpoint: string;
};

export type ComponentPropsWithChildren<TInputs = unknown> = ComponentProps<
    TInputs & { children: React.ReactNode }
>;
