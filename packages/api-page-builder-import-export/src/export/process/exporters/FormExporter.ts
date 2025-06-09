import Zipper from "~/export/zipper.js";
import { type FbForm } from "@webiny/api-form-builder/types.js";
import { type File } from "@webiny/api-file-manager/types.js";

export interface ExportedFormData {
    form: Pick<
        FbForm,
        "name" | "status" | "version" | "fields" | "steps" | "settings" | "triggers"
    >;
    files: File[];
}

export class FormExporter {
    async execute(form: FbForm, exportFormsDataKey: string) {
        const formData = {
            form: {
                name: form.name,
                status: form.status,
                version: form.version,
                fields: form.fields,
                steps: form.steps,
                settings: form.settings,
                triggers: form.triggers
            }
        };
        const formDataBuffer = Buffer.from(JSON.stringify(formData));

        const zipper = new Zipper({
            exportInfo: {
                files: [],
                name: form.name,
                dataBuffer: formDataBuffer
            },
            archiveFileKey: exportFormsDataKey
        });

        return zipper.process();
    }
}
