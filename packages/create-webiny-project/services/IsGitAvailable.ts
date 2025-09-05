import execa from "execa";

export class IsGitAvailable {
    async execute() {
        try {
            await execa.sync("git", ["--version"]);
            return true;
        } catch {
            return false;
        }
    }
}
