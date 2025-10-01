import {
    type Component,
    type ComponentManifest,
    type InputFactory
} from "@webiny/website-builder-sdk";
import { createSlotInput } from "@webiny/website-builder-sdk";
import type { ExtractInputs } from "~/types.js";

type ManifestInputsArray<TInputs> = {
    [K in keyof TInputs]: InputFactory<K & string>;
}[keyof TInputs][];
type ManifestInputsObject<TInputs> = { [K in keyof TInputs]: InputFactory<K & string> };

type ManifestConfig<TInputs> = Omit<ComponentManifest, "inputs"> & {
    inputs: ManifestInputsArray<TInputs> | ManifestInputsObject<TInputs>;
};

export function createComponent<
    TComponent extends (props: any) => any,
    TInputs extends ExtractInputs<Parameters<TComponent>[0]>
>(
    component: TComponent,
    manifest: ManifestConfig<TInputs>
): { component: TComponent; manifest: ManifestConfig<TInputs> } {
    const acceptsChildren = manifest.acceptsChildren;

    if (acceptsChildren) {
        if (manifest.inputs && !Array.isArray(manifest.inputs)) {
            manifest.inputs = Object.values(manifest.inputs);
        } else {
            manifest.inputs = manifest.inputs ?? [];
        }

        manifest.inputs.push(
            // @ts-expect-error
            createSlotInput({
                name: "children",
                defaultValue: []
            })
        );
    }

    return { component, manifest };
}
