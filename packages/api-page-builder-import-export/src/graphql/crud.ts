import blocks from "./crud/blocks.crud.js";
import forms from "./crud/forms.crud.js";
import pages from "./crud/pages.crud.js";
import templates from "./crud/templates.crud.js";
import importExportTask from "./crud/importExportTasks.crud.js";
import { ImportExportPluginsParams } from "~/graphql/types.js";

export default (params: ImportExportPluginsParams) => [
    blocks,
    forms,
    pages,
    templates,
    importExportTask(params)
];
