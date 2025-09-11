import type { MigrationRunnerResult } from "~/cli/MigrationRunner.js";

export interface MigrationRunReporter {
    report(result: MigrationRunnerResult): void | Promise<void>;
}
