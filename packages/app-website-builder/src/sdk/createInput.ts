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
    ListInput,
    DateTimeInput,
    ComponentInput
} from "./types";

type OmitType<T> = Omit<T, "type">;

// Text
export function createTextInput(input: OmitType<TextInput>) {
    return createInput({ type: "text", renderer: "Webiny/Input", ...input }) as TextInput;
}

// Long Text
export function createLongTextInput(input: OmitType<LongTextInput>) {
    return createInput({ type: "longText", renderer: "Webiny/Textarea", ...input }) as LongTextInput;
}

// Number
export function createNumberInput(input: OmitType<NumberInput>) {
    return createInput({ type: "number", renderer: "Webiny/Input", ...input }) as NumberInput;
}

// Boolean
export function createBooleanInput(input: OmitType<BooleanInput>) {
    return createInput({ type: "boolean", renderer: "Webiny/Switch", ...input }) as BooleanInput;
}

// Color
export function createColorInput(input: OmitType<ColorInput>) {
    return createInput({ type: "color", renderer: "Webiny/ColorPicker", ...input }) as ColorInput;
}

// File
export function createFileInput(input: OmitType<FileInput>) {
    return createInput({ type: "file", renderer: "Webiny/FileManager", ...input }) as FileInput;
}

// Date
export function createDateInput(input: OmitType<DateTimeInput>) {
    return createInput({ type: "datetime", renderer: "Webiny/DateTime", ...input }) as DateTimeInput;
}

// Rich Text
export function createRichTextInput(input: OmitType<RichTextInput>) {
    return createInput({ type: "richText", renderer: "Webiny/Lexical", ...input }) as RichTextInput;
}

// Select
export function createSelectInput(input: OmitType<SelectInput>) {
    return createInput({ type: "select", renderer: "Webiny/Select", ...input }) as SelectInput;
}

// Radio
export function createRadioInput(input: OmitType<RadioInput>) {
    return createInput({ type: "radio", renderer: "Webiny/RadioGroup",...input }) as RadioInput;
}

// Object
export function createObjectInput(input: OmitType<ObjectInput>) {
    return createInput({ type: "object", renderer: "Webiny/Object", ...input }) as ObjectInput;
}

// List
export function createListInput(input: OmitType<ListInput>) {
    return createInput({ type: "list", renderer: "Webiny/List", ...input } as ListInput) as ListInput;
}

// Tags
export function createTagsInput(input: Omit<ListInput, "type" | "itemType">) {
    return createInput({
        type: "list",
        itemType: "text",
        renderer: "Webiny/Tags",
        ...input
    } as ListInput) as ListInput;
}

// Implementation
export function createInput(input: ComponentInput): ComponentInput {
    return input;
}
