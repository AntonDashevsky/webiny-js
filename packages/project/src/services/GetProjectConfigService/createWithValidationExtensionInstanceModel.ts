import { ProjectSdkParamsService } from "~/abstractions";
import { ExtensionInstanceModel } from "~/extensions/models/index.js";
import { Metadata } from "@webiny/di-container";
import fs from "fs";
import path from "path";

export function createWithValidationExtensionInstanceModel<
    TParams extends Record<string, any> = Record<string, any>
>(projectSdkParams: ProjectSdkParamsService.Params) {
    return class WithValidationExtensionInstanceModel extends ExtensionInstanceModel<TParams> {
        override async validate(): Promise<void> {
            const src = "src" in this.params ? (this.params.src as string) : null;
            if (!src) {
                return super.validate?.();
            }

            const name = "name" in this.params ? this.params.name : "unknown";

            const absoluteSrcPath = path.join(projectSdkParams.cwd, src);
            if (!fs.existsSync(absoluteSrcPath)) {
                throw new Error(`Source file for extension "${name}" does not exist: ${absoluteSrcPath}`);
            }

            if (this.definition.abstraction) {
                const { default: exportedImplementation } = await import(absoluteSrcPath);

                if (!exportedImplementation) {
                    throw new Error(
                        `Source file for extension "${name}" (type: ${this.definition.type}) must have a default export.`
                    );
                }

                const metadata = new Metadata(exportedImplementation);
                const metadataName = metadata.getAbstraction().toString();
                const defName = this.definition.abstraction.toString();
                const isCorrectAbstraction =
                    metadata.getAbstraction() === this.definition.abstraction;
                if (!isCorrectAbstraction) {
                    throw new Error(
                        `Source file for extension "${name}" (type: ${
                            this.definition.type
                        }) must export a class that implements the "${this.definition.abstraction.toString()}" abstraction.`
                    );
                }
            }

            return super.validate?.();
        }
    };
}
