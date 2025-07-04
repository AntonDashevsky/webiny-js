import { useDocumentEditor } from "~/DocumentEditor";
import { StylesBindingsProcessor } from "~/sdk/StylesBindingsProcessor";
import {
    BreakpointElementMetadata,
    ElementMetadata,
    IMetadata,
    NullMetadata,
    StylesMetadata
} from "~/BaseEditor/metadata";
import { Commands } from "~/BaseEditor";
import { Editor } from "~/editorSdk/Editor";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { type InheritanceInfo, InheritanceProcessor } from "~/sdk/InheritanceProcessor";
import { BindingsProcessor, type DocumentElementBindings, type Document } from "~/sdk";
import { $getComponentManifestByElementId } from "~/editorSdk/utils";
import { ComponentManifestToAstConverter } from "~/sdk/ComponentManifestToAstConverter";

export type StyleStoreVm = {
    styles: Record<string, any>;
    metadata: IMetadata;
    inheritanceMap: InheritanceInfo["styles"];
};

export class StylesStore {
    private editor: ReturnType<typeof useDocumentEditor>;
    private elementId: string;
    private breakpointNames: string[];
    private stylesProcessor: StylesBindingsProcessor | undefined;
    private elementMetadata: IMetadata = new NullMetadata();
    private devFriendlyStyles: Record<string, any> = {};
    private localPreviewStyles: Record<string, any> | undefined = undefined;
    private currentBreakpoint: string = "desktop";
    private inheritanceMap: InheritanceInfo["styles"] = {};
    private rawBindings: DocumentElementBindings = {};
    private bindingsProcessor: BindingsProcessor;
    private inheritanceProcessor: InheritanceProcessor;
    constructor(editor: Editor, elementId: string, breakpointNames: string[]) {
        this.editor = editor;
        this.elementId = elementId;
        this.breakpointNames = breakpointNames;

        const manifest = $getComponentManifestByElementId(editor, elementId ?? "");
        const inputsAst = ComponentManifestToAstConverter.convert(manifest?.inputs ?? []);

        this.bindingsProcessor = new BindingsProcessor(this.breakpointNames);
        this.inheritanceProcessor = new InheritanceProcessor(this.breakpointNames, inputsAst);

        const document = this.editor.getDocumentState().read();
        const editorState = this.editor.getEditorState().read();
        const breakpoint = editorState.breakpoint ?? "desktop";

        // Initial setup.
        this.calculateStuff(document, breakpoint);

        autorun(() => {
            const document = this.editor.getDocumentState().read();
            const editorState = this.editor.getEditorState().read();
            const breakpoint = editorState.breakpoint ?? "desktop";

            runInAction(() => {
                this.calculateStuff(document, breakpoint);
            });
        });

        makeAutoObservable(this);
    }

    get vm(): StyleStoreVm {
        return {
            styles: this.localPreviewStyles ?? this.devFriendlyStyles,
            metadata: this.elementMetadata,
            inheritanceMap: this.inheritanceMap
        };
    }

    onChange = (cb: (params: { styles: StylesValueObject; metadata: IMetadata }) => void) => {
        if (!this.stylesProcessor) {
            return;
        }

        const styles = new StylesValueObject(this.devFriendlyStyles);
        cb({ styles, metadata: this.elementMetadata });

        const finalStyles = styles.getAll();

        const updatedStyles = this.stylesProcessor.createUpdate(
            finalStyles,
            this.currentBreakpoint
        );

        this.localPreviewStyles = undefined;

        this.editor.updateDocument(document => {
            updatedStyles.applyToDocument(document);
            this.elementMetadata.applyToDocument(document);
        });
    };

    onPreviewChange = (
        cb: (params: { styles: StylesValueObject; metadata: IMetadata }) => void
    ) => {
        if (!this.stylesProcessor) {
            return;
        }

        const styles = new StylesValueObject(structuredClone(this.devFriendlyStyles));

        cb({ styles, metadata: this.elementMetadata });

        const finalStyles = styles.getAll();

        this.localPreviewStyles = finalStyles;

        const updatedStyles = this.stylesProcessor.createUpdate(
            finalStyles,
            this.currentBreakpoint
        );

        this.editor.executeCommand(Commands.PreviewPatchElement, {
            elementId: this.elementId,
            patch: updatedStyles.createJsonPatch(this.rawBindings)
        });
    };

    private calculateStuff(document: Document, breakpoint: string) {
        const bindings = document.bindings[this.elementId] ?? {};
        this.currentBreakpoint = breakpoint;

        this.rawBindings = bindings;
        const resolvedBindings = this.bindingsProcessor.getBindings(
            bindings,
            this.currentBreakpoint
        );

        const inheritanceMap = this.inheritanceProcessor.getInheritanceMap(
            bindings,
            this.currentBreakpoint
        );

        this.inheritanceMap = inheritanceMap.styles;

        this.stylesProcessor = new StylesBindingsProcessor(
            this.elementId,
            this.breakpointNames,
            bindings
        );

        this.elementMetadata = new StylesMetadata(
            new BreakpointElementMetadata(
                this.breakpointNames,
                this.currentBreakpoint,
                new ElementMetadata(this.elementId, bindings.metadata)
            )
        );

        this.devFriendlyStyles = this.stylesProcessor.toDeepStyles(resolvedBindings.styles);
    }
}

export class StylesValueObject {
    private readonly value: Record<string, any>;

    constructor(value: any = {}) {
        this.value = value;
    }

    set(key: string, value: any) {
        this.value[key] = value;
    }

    get(key: string) {
        return this.value[key];
    }

    getAll() {
        return this.value;
    }

    unset(key: string) {
        delete this.value[key];
    }
}
