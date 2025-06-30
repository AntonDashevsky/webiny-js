import { ProjectSdk } from "./ProjectSdk";

import { createImplementation } from "@webiny/di-container";
import { BeforeBuildHook } from "~/abstractions";

class MyBeforeBuildHook implements BeforeBuildHook.Interface {
    execute() {
        console.log("1");
    }
}

const myBeforeBuildHook = createImplementation({
    abstraction: BeforeBuildHook,
    implementation: MyBeforeBuildHook,
    dependencies: []
});

class MyOtherBeforeBuildHook implements BeforeBuildHook.Interface {
    execute() {
        console.log("2");
    }
}

const myOtherBeforeBuildHook = createImplementation({
    abstraction: BeforeBuildHook,
    implementation: MyOtherBeforeBuildHook,
    dependencies: []
});



async function main() {
    const cwd = process.cwd();
    const project = ProjectSdk.init(cwd, {
        beforeBuildHooks: [
            // @ts-ignore TODO: Fix this.
            myBeforeBuildHook,

            // @ts-ignore TODO: Fix this.
            myOtherBeforeBuildHook
        ]
    });

    const apiPackages = await project.deployApp({
        app: "core",
        env: "dev",
        preview: true,
    });
}

await main();
