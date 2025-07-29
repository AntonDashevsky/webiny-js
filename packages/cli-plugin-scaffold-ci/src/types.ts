import type {
    CliCommandScaffoldCallableArgs,
    CliCommandScaffoldCallableWithErrorArgs
} from "@webiny/cli-plugin-scaffold/types";
import type { Plugin } from "@webiny/plugins/types";
import type { DistinctQuestion } from "inquirer";
import type { GenericRecord } from "@webiny/cli/types";

export interface CliPluginsScaffoldCi<T extends GenericRecord = GenericRecord> extends Plugin {
    type: "cli-plugin-scaffold-ci";
    provider: string;
    generate: (args: CliCommandScaffoldCallableArgs<T>) => Promise<any>;
    onGenerate?: (args: CliCommandScaffoldCallableArgs<T>) => Promise<any>;
    onSuccess?: (args: CliCommandScaffoldCallableArgs<T>) => Promise<any>;
    onError?: (args: CliCommandScaffoldCallableWithErrorArgs<T>) => Promise<any>;
    questions: () => DistinctQuestion<T>[];
}
