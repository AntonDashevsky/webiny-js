import { ProjectSdk } from "./ProjectSdk";

import { createImplementation } from "@webiny/di-container";
import { BeforeBuildHook } from "~/abstractions";

class MyBeforeBuildHook implements BeforeBuildHook.Interface {
    execute() {
        console.log("1");
    }
}

class MyOtherBeforeBuildHook implements BeforeBuildHook.Interface {
    execute() {
        console.log("2");
    }
}

async function main() {
    const cwd = process.cwd();
    const project = ProjectSdk.init(cwd, {
        beforeBuildHooks: [
            createImplementation({
                abstraction: BeforeBuildHook,
                implementation: MyBeforeBuildHook,
                dependencies: []
            }),
            createImplementation({
                abstraction: BeforeBuildHook,
                implementation: MyOtherBeforeBuildHook,
                dependencies: []
            })
        ]
    });

    const apiPackages = await project.buildApp({
        app: "api",
        env: "dev"
    });
}

await main();
