import type { MigrationStatus } from "~/types.js";

export interface MigrationStatusReporter {
    report(status: MigrationStatus): void;
}
