import { ProjectSdk } from "./ProjectSdk.js";

async function main() {
    const cwd = process.cwd();
    const projectSdk = ProjectSdk.init(cwd);

    await projectSdk.watch({
        package: ['api-graphql'],
        env: 'dev',
    });

}

await main();



// my before stuff
// await decoratee()
// my after stuff


// cli.deploy - sdk.deploy();