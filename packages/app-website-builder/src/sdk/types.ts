export type ElementMap = Record<string, DocumentElement>;

export type Document = {
    properties: Record<string, any>;
    elements: ElementMap;
};

export type ResolvedComponent<TComponent = any> = {
    component: TComponent;
    inputs: Record<string, any>;
    manifest?: ComponentManifest;
    styles: SerializableCSSStyleDeclaration;
};

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
    canHaveChildren?: boolean;
    defaultChildren?: DocumentElement[];
    hideFromToolbar?: boolean;
};

export type ComponentInput = {
    name: string;
    label?: string;
    defaultValue?: any;
    type: string;
    required?: boolean;
    subFields?: ComponentInput[];
    helperText?: string;
    hideFromUi?: boolean;
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

export type Page = {
    properties: Record<string, any>;
    elements: Record<string, any>;
};

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
    resolveElement(element: DocumentElement): ResolvedComponent | null;
}

export type DisplayMode = {
    name: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    minWidth: number;
    maxWidth: number;
};
