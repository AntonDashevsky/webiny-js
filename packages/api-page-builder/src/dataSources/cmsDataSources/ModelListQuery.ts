import { CmsModel } from "@webiny/api-headless-cms/types/index.js";
import { PathsParser } from "./converter/PathsParser.js";
import { SelectionFormatter } from "./converter/SelectionFormatter.js";

export class ModelListQuery {
    getQuery(model: CmsModel, paths: string[]) {
        const parser = new PathsParser();
        const formatter = new SelectionFormatter();

        const selection = formatter.formatSelection(parser.parse(paths));

        return /* GraphQL */ `
            query ListEntries($limit: Int) {
                entries: list${model.pluralApiName}(limit: $limit) {
                    data ${selection}                   
                    error {
                        code
                        message
                        data
                    }
                }
            }
        `;
    }
}
