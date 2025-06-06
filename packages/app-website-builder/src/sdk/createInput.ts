import {
    TextInput,
    LongTextInput,
    NumberInput,
    BooleanInput,
    ColorInput,
    FileInput,
    RichTextInput,
    SelectInput,
    RadioInput,
    ObjectInput,
    DateTimeInput,
    ComponentInput,
    TagsInput
} from "./types";

type OmitType<T> = Omit<T, "type" | "dataType">;

// Text
export function createTextInput(input: OmitType<TextInput>) {
    return createInput({
        type: "text",
        dataType: "text",
        renderer: "Webiny/Input",
        ...input
    }) as TextInput;
}

// Long Text
export function createLongTextInput(input: OmitType<LongTextInput>) {
    return createInput({
        type: "longText",
        dataType: "text",
        renderer: "Webiny/Textarea",
        ...input
    });
}

// Number
export function createNumberInput(input: OmitType<NumberInput>) {
    return createInput({
        type: "number",
        dataType: "number",
        renderer: "Webiny/Input",
        ...input
    }) as NumberInput;
}

// Boolean
export function createBooleanInput(input: OmitType<BooleanInput>) {
    return createInput({
        type: "boolean",
        dataType: "boolean",
        renderer: "Webiny/Switch",
        ...input
    }) as BooleanInput;
}

// Color
export function createColorInput(input: OmitType<ColorInput>) {
    return createInput({
        type: "color",
        dataType: "text",
        renderer: "Webiny/ColorPicker",
        ...input
    }) as ColorInput;
}

// File
export function createFileInput(input: OmitType<FileInput>) {
    return createInput({
        type: "file",
        dataType: "text",
        renderer: "Webiny/FileManager",
        ...input
    }) as FileInput;
}

// Date
export function createDateInput(input: OmitType<DateTimeInput>) {
    return createInput({
        type: "datetime",
        dataType: "datetime",
        renderer: "Webiny/DateTime",
        ...input
    }) as DateTimeInput;
}

// Rich Text
export function createRichTextInput(input: OmitType<RichTextInput>) {
    return createInput({
        type: "richText",
        dataType: "json",
        renderer: "Webiny/Lexical",
        ...input
    }) as RichTextInput;
}

// Select
export function createSelectInput(input: OmitType<SelectInput>) {
    return createInput({
        type: "select",
        dataType: "text",
        renderer: "Webiny/Select",
        ...input
    }) as SelectInput;
}

// Radio
export function createRadioInput(input: OmitType<RadioInput>) {
    return createInput({
        type: "radio",
        dataType: "text",
        renderer: "Webiny/RadioGroup",
        ...input
    }) as RadioInput;
}

// Object
export function createObjectInput(input: OmitType<ObjectInput>) {
    return createInput({
        type: "object",
        dataType: "object",
        renderer: "Webiny/Object",
        ...input
    }) as ObjectInput;
}

// Tags
export function createTagsInput(input: OmitType<TagsInput>) {
    return createInput({
        type: "text",
        dataType: "text",
        list: true,
        renderer: "Webiny/Tags",
        ...input
    }) as TagsInput;
}

// Implementation
export function createInput(input: ComponentInput): ComponentInput {
    return input;
}
