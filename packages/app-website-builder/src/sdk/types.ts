export type ElementMap = Record<string, DocumentElement>;

export type StaticBinding = { type: "static"; value: string | number | boolean };

export type ExpressionBinding = { type: "expression"; value: string };

export type DocumentState = Record<string, any>;

type DocumentElementBindings = {
    [key: string]: Array<StaticBinding | ExpressionBinding>;
};

export type DocumentBindings = Record<string, DocumentElementBindings>;

export type Document = {
    properties: Record<string, any>;
    state: DocumentState;
    bindings: DocumentBindings;
    elements: ElementMap;
};

export type ResolvedComponent<TComponent = any> = {
    component: TComponent;
    inputs: Record<string, any>;
    manifest?: ComponentManifest;
    styles: SerializableCSSStyleDeclaration;
};

export type ResolvedElement = Omit<DocumentElement, "styles"> & {
    styles: SerializableCSSStyleDeclaration;
}

export type Component = {
    component: any;
    manifest: ComponentManifest;
};

export type ComponentGroupItem = {
    // Name of the component.
    name: string;
    // Optionally, define an exact element to insert.
    item?: DocumentElementTemplate;
};

export type SerializedComponentGroup = ComponentGroup & {
    filter?: string;
};

export type ComponentGroup = {
    name: string;
    label: string;
    filter?: (component: ComponentManifest) => boolean;
};

export type ComponentManifest = {
    name: string;
    group?: string;
    label?: string;
    image?: string;
    inputs?: ComponentInput[];
    defaultStyles?: { [key: string]: SerializableCSSStyleDeclaration };
    acceptsChildren?: boolean;
    defaultChildren?: DocumentElement[];
    hideFromToolbar?: boolean;
};

export type ElementComponent = {
    name: string;
    inputs: Record<string, any>;
};

export type DocumentElementTemplate = Omit<DocumentElement, "id">;

export type DocumentElement = {
    type: "Webiny/Element";
    id: string;
    component: ElementComponent;
    parent?: {
        id: string;
        slot: string;
    };
    styles?: {
        [key: string]: SerializableCSSStyleDeclaration;
    };
};

export type SerializableCSSStyleDeclaration = Partial<Record<keyof CSSStyleDeclaration, string>>;

export type Page = Document;

export type Box = {
    depth: number;
    parentId: string;
    parentSlot: string;
    parentIndex: number;
    width: number;
    height: number;
    top: number;
    left: number;
};

export type ElementBoxData = Box & {
    type: "element";
};

export type ElementSlotBoxData = Box & {
    type: "element-slot";
};

export type BoxData = ElementBoxData | ElementSlotBoxData;

export type EditorViewportInfo = PreviewViewportInfo & {
    top: number;
    left: number;
};

export type PreviewViewportInfo = {
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
};

export type BoxesData = Record<string, BoxData>;

export type EditorViewportData = {
    boxes: BoxesData;
    viewport: EditorViewportInfo;
};

export type PreviewViewportData = {
    boxes: BoxesData;
    viewport: PreviewViewportInfo;
};

export interface IDataProvider {
    getPage(path: string): Promise<Page | null>;
    listPages(): Promise<Page[]>;
}

export interface IEnvironment {
    isClient(): boolean;
    isServer(): boolean;
    isPreview(): boolean;
}

export interface IContentSdk extends IDataProvider {
    registerComponent(component: Component): void;
    resolveElement(
        element: DocumentElement,
        state: DocumentState,
        bindings: DocumentBindings,
        displayMode: string
    ): ResolvedComponent[] | null;
}

export type DisplayMode = {
    name: string;
    minWidth: number;
    maxWidth: number;
};

// Input types

// inputTypes.ts
export type BaseInput<T = any> = {
    name: string;
    type: string;
    dataType: string;
    label?: string;
    description?: string;
    helperText?: string;
    defaultValue?: T;
    required?: boolean;
    hideFromUi?: boolean;
    renderer?: string;
    list?: boolean;
};

// Discriminated union per input type
export type TextInput = BaseInput<string> & {
    type: "text";
    dataType: "text";
};

export type TagsInput = BaseInput<string[]> & {
    type: "text";
    dataType: "text";
};

export type LongTextInput = BaseInput<string> & {
    type: "longText";
    dataType: "text";
};

export type NumberInput = BaseInput<number> & {
    type: "number";
    dataType: "number";
};

export type BooleanInput = BaseInput<boolean> & {
    type: "boolean";
    dataType: "boolean";
};

export type ColorInput = BaseInput<string> & {
    type: "color";
    dataType: "text";
};

export type FileInput = BaseInput<string> & {
    type: "file";
    dataType: "text";
    allowedFileTypes: string[];
};

export type DateTimeInput = BaseInput<string> & {
    type: "datetime";
    dataType: "datetime";
};

export type RichTextInput = BaseInput<string> & {
    type: "richText";
    dataType: "json";
};

export type SelectInput = BaseInput<string> & {
    type: "select";
    dataType: "text";
    options: { label: string; value: string }[];
};

export type RadioInput = BaseInput<string> & {
    type: "radio";
    dataType: "text";
    options: { label: string; value: string }[];
};

export type ObjectInput = BaseInput<Record<string, any>> & {
    type: "object";
    dataType: "object";
    fields: ComponentInput[];
};

export type CustomInput = BaseInput<any> & {
    type: string;
    dataType: string;
    fields: ComponentInput[];
};

// Union of all input types
export type ComponentInput =
    | TextInput
    | LongTextInput
    | NumberInput
    | BooleanInput
    | ColorInput
    | FileInput
    | DateTimeInput
    | RichTextInput
    | SelectInput
    | RadioInput
    | TagsInput
    | ObjectInput
    | CustomInput;
