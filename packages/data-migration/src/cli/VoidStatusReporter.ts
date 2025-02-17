import { MigrationStatusReporter } from "./MigrationStatusReporter.js";

export class VoidStatusReporter implements MigrationStatusReporter {
    report(): void {
        // This is a void reporter.
    }
}
