export interface CustomReactEditorProps<T = any> {
    value?: T;
    onChange(val: T | undefined): void;
}
