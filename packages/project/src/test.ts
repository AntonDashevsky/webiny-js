import { ProjectSdk } from "./ProjectSdk";
import { createDecorator } from "@webiny/di-container";
import { BuildApp } from "~/abstractions";

// BEFORE HOOKS
class MyBeforeBuildHook implements BuildApp.Interface {
    constructor(private decoratee: BuildApp.Interface) {}

    async execute(params: BuildApp.Params) {
        console.log("Before build 1");
        return this.decoratee.execute(params);
    }
}

const myBeforeBuildHook = createDecorator({
    abstraction: BuildApp,
    decorator: MyBeforeBuildHook,
    dependencies: []
});

class MyOtherBeforeBuildHook implements BuildApp.Interface {
    constructor(private decoratee: BuildApp.Interface) {}

    async execute(params: BuildApp.Params) {
        console.log("Before build 2");
        return this.decoratee.execute(params);
    }
}

const myOtherBeforeBuildHook = createDecorator({
    abstraction: BuildApp,
    decorator: MyOtherBeforeBuildHook,
    dependencies: []
});

// AFTER HOOKS
class MyAfterBuildHook implements BuildApp.Interface {
    constructor(private decoratee: BuildApp.Interface) {}

    async execute(params: BuildApp.Params) {
        const result = await this.decoratee.execute(params);
        console.log("After build 1");
        return result;
    }
}

const myAfterBuildHook = createDecorator({
    abstraction: BuildApp,
    decorator: MyAfterBuildHook,
    dependencies: []
});

async function main() {
    const cwd = process.cwd();
    const projectSdk = ProjectSdk.init(cwd);

    projectSdk.getContainer().registerDecorator(myBeforeBuildHook);
    projectSdk.getContainer().registerDecorator(myOtherBeforeBuildHook);
    projectSdk.getContainer().registerDecorator(myAfterBuildHook);

    await projectSdk.buildApp({
        app: "core",
        env: "dev"
    });
}

await main();
