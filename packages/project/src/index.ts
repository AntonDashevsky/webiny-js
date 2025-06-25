import { Project } from "./Project";

async function main() {
    const project = Project.init();
    // const pro = await project.getProject();
    //
    // console.log("1.", pro);
    //
    // const api = await project.getApp("api");
    // console.log("2.", api);

    const apiPackages = await project.buildApp({
        app: "api",
        env: "dev"
    });
}

await main();
