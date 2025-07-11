import { BaseBuildOutput } from "./BaseBuildOutput.js";

export class ZeroBuildsOutput extends BaseBuildOutput {
    public override async output() {
        // Simply don't do anything. There are no builds to output.
    }
}
