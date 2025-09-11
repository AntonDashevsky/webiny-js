import type { MigrationRunnerResult } from "~/cli/MigrationRunner";

export interface MigrationRunReporter {
    report(result: MigrationRunnerResult): void | Promise<void>;
}
