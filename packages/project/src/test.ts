import { ProjectSdk } from "./ProjectSdk";

async function main() {
    const cwd = process.cwd();
    const projectSdk = ProjectSdk.init(cwd);

    const result = await projectSdk.getAppOutput<{ a: 123 }>({
        app: "core",
        env: "dev"
    });

    console.log("result", result);
}

await main();
