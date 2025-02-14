import { join, dirname } from "path";
import glob from "fast-glob";
import findUp from "find-up";
import { PackageJson } from "./PackageJson.js";
import { ProjectApplication } from "./ProjectApplication.js";

const projectConfigs = ["webiny.project.js", "webiny.project.ts"];

async function getRoot() {
    let root = await findUp(projectConfigs);
    if (root) {
        return dirname(root).replace(/\\/g, "/");
    }

    // For backwards compatibility
    root = await findUp("webiny.root.js");
    if (root) {
        return dirname(root).replace(/\\/g, "/");
    }

    throw new Error("Couldn't detect Webiny project.");
}

async function getConfig() {
    let path = await findUp(projectConfigs);
    if (path) {
        return await import(path).then(m => m.default ?? m);
    }

    throw new Error("Couldn't detect Webiny project.");
}

export class Project {
    root;
    config;
    version;
    applications;

    constructor(root, config) {
        this.root = root;
        this.config = config;
    }

    get name() {
        return process.env.WEBINY_PROJECT_NAME || this.config.projectName || this.config.name;
    }

    get config() {
        return this.config;
    }

    get root() {
        return this.root;
    }

    getApplication(applicationRoot) {
        return this.applications[applicationRoot];
    }

    /**
     * @private
     * @internal
     */
    async init() {
        // Read `@webiny/cli` package version.
        const packageJson = await PackageJson.findClosest(import.meta.dirname);
        this.version = packageJson.getJson().version;

        // Identify project applications.
        const projectApplications = await glob(
            join(this.root, "apps/**/webiny.application*.{ts,js}").replace(/\\/g, "/"),
            { onlyFiles: true, ignore: ["**/node_modules/**"] }
        );

        try {
            this.applications = await projectApplications.reduce((acc, appRoot) => {
                return acc.then(async acc => {
                    const projectApplication = await ProjectApplication.loadFromDirectory(
                        this,
                        appRoot
                    );
                    return {
                        ...acc,
                        [projectApplication.root]: projectApplication
                    };
                });
            }, Promise.resolve({}));
        } catch (error) {
            console.log(error);
            // Usually, this error will happen in webiny-js repository, when building repo packages.
            // It is ok to ignore this error, because it is only related to package building, not actual project runtime.
        }
    }

    static async load() {
        const root = await getRoot();
        const config = await getConfig();

        const project = new Project(root, config);
        await project.init();
        return project;
    }
}
