import { ProjectSdk } from "./ProjectSdk.js";

async function main() {
    const cwd = process.cwd();
    const projectSdk = ProjectSdk.init(cwd);

    const reza = await projectSdk.getAppOutput({
        app: "core",
        env: "dev",
    });

    console.log('reza', reza);
}

await main();



// my before stuff
// await decoratee()
// my after stuff


// cli.deploy - sdk.deploy();