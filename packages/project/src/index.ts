import { Project } from "./Project";

async function main() {
    const project = Project.init();
    const reza = await project.getProject();

    console.log('1.', reza);

    const reza2 = await project.getApp('api');
    console.log('2.', reza2);
}

await main();
