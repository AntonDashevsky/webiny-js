import slugify from "slugify";
import { InputElement } from "@webiny/app-admin/ui/elements/form/InputElement.js";
import { validation } from "@webiny/validation";
import { TextareaElement } from "@webiny/app-admin/ui/elements/form/TextareaElement.js";
import { PageSettingsFormView } from "~/editor/ui/views/PageSettingsView/PageSettingsFormView.js";
import { SelectElement } from "@webiny/app-admin/ui/elements/form/SelectElement.js";
import { plugins } from "@webiny/plugins";
import { type PbPageLayoutPlugin } from "~/types.js";
import { FileManagerElement } from "@webiny/app-admin/ui/elements/form/FileManagerElement.js";
import { TagsMultiAutocompleteElement } from "~/editor/ui/elements/TagsMultiAutocompleteElement.js";

const toSlug = (value: string, cb: (value: string) => void): void => {
    cb(
        slugify(value, {
            replacement: "-",
            lower: true,
            remove: /[*#\?<>_\{\}\[\]+~.()'"!:;@]/g,
            trim: false
        })
    );
};

export class GeneralSettingsView extends PageSettingsFormView {
    constructor() {
        super("GeneralSettingsView");

        this.setTitle("General Settings");

        this.addField(
            new InputElement("title", {
                name: "title",
                label: "Title",
                description:
                    "Page title. Will be used on the public website if the SEO title wasn't specified (SEO settings tab).",
                validators: () => validation.create("required")
            })
        );

        this.addField(
            new InputElement("path", {
                name: "path",
                label: "Path",
                description: `For example: "/about-us". Must contain at least two characters.`,
                validators: () => validation.create("required,minLength:2"),
                beforeChange: toSlug
            })
        );

        this.addField(
            new TextareaElement("snippet", {
                name: "settings.general.snippet",
                label: "Snippet",
                description: "Page snippet.",
                rows: 4
            })
        );

        this.addField(
            new SelectElement("layout", {
                name: "settings.general.layout",
                label: "Layout",
                description: "Render this page using the selected layout.",
                options: plugins.byType<PbPageLayoutPlugin>("pb-page-layout").map(pl => {
                    return { value: pl.layout.name, label: pl.layout.title };
                })
            })
        );

        this.addField(
            new TagsMultiAutocompleteElement("tags", {
                name: "settings.general.tags",
                label: "Tags",
                description: "Add tags to filter pages."
            })
        );

        this.addField(
            new FileManagerElement("image", {
                name: "settings.general.image",
                label: "Page Image"
            })
        );

        this.applyPlugins(GeneralSettingsView);
    }
}
