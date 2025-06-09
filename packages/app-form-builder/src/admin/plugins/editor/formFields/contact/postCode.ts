import textFieldPlugin from "./../text.js";
import { type FbBuilderFieldPlugin } from "../../../../../types.js";

const plugin: FbBuilderFieldPlugin = {
    type: "form-editor-field-type",
    name: "form-editor-field-type-post-code",
    field: {
        ...textFieldPlugin.field,
        unique: true,
        group: "form-editor-field-group-contact",
        name: "postCode",
        label: "Post code",
        createField(props) {
            return {
                ...textFieldPlugin.field.createField(props),
                name: this.name,
                fieldId: "postCode",
                label: "Post code"
            };
        }
    }
};

export default plugin;
