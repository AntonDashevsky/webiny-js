import { ProjectSdk } from "./ProjectSdk.js";

async function main() {
    const cwd = process.cwd();
    const projectSdk = ProjectSdk.init(cwd);

    await projectSdk.refreshApp({
        app: "core",
        env: "dev",
        onPulumiProcess: pulumiProcess => {
            pulumiProcess.stdout!.pipe(process.stdout);
            pulumiProcess.stderr!.pipe(process.stderr);
        }
    });
}

await main();
