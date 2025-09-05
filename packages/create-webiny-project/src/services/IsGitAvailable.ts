import execa from "execa";

export class IsGitAvailable {
    execute() {
        try {
            execa.sync("git", ["--version"]);
            return true;
        } catch {
            return false;
        }
    }
}
