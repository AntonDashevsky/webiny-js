import { describe, it } from "vitest";
import type { ComponentProps, ExtractInputNames } from "~/types.js";
import { createComponent } from "~/createComponent.js";
import { createFileInput, createTextInput } from "~/index.js";
import { createSlotInput } from "@webiny/website-builder-sdk";

// TODO: figure out how to enable typechecking for a single test

describe("Component Manifest", () => {
    it("should enforce input names as defined in component props", () => {
        const Button = (_: ComponentProps<{ title: string; image: string }>) => {
            return null;
        };

        type ButtonInputs = ExtractInputNames<typeof Button>;

        createComponent(Button, {
            name: "Button",
            inputs: [
                createTextInput<ButtonInputs>({
                    name: "title"
                }),
                createFileInput<ButtonInputs>({
                    name: "image",
                    allowedFileTypes: ["image/*"]
                })
            ]
        });
    });

    // it("acceptsChildren should satisfy the `children` input requirement", () => {
    //     const Button = (_: ComponentProps<{ children: React.ReactNode }>) => {
    //         return null;
    //     };
    //
    //     createComponent(Button, {
    //         name: "Button",
    //         acceptsChildren: true,
    //     });
    // });

    it("acceptsChildren should work with other inputs", () => {
        const Button = (_: ComponentProps<{ title: string; children: React.ReactNode }>) => {
            return null;
        };

        // type ButtonInputs = ExtractInputNames<typeof Button>;

        createComponent(Button, {
            name: "Button",
            inputs: [
                createTextInput({
                    name: "title"
                }),
                createTextInput({
                    name: "children"
                })
            ]
        });

        createComponent(Button, {
            name: "Button",
            inputs: {
                title: createTextInput({
                    label: "Title"
                }),
                children: createSlotInput({})
            }
        });
    });
});
