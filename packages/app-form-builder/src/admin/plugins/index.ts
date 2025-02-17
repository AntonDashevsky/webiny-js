import install from "./installation.js";
import formDetailsPreviewContent from "./formDetails/previewContent/index.js";
import formDetailsRevisions from "./formDetails/formRevisions/index.js";
import formDetailsSubmissions from "./formDetails/formSubmissions/index.js";
import formEditorDefaultBar from "./editor/defaultBar/index.js";
import formEditorSettings from "./editor/formSettings/index.js";
import permissionRenderer from "./permissionRenderer/index.js";

export default () => [
    permissionRenderer(),
    install,
    formDetailsPreviewContent,
    formDetailsRevisions,
    formDetailsSubmissions,
    formEditorDefaultBar,
    formEditorSettings
];
