const { join, dirname } = require("path");
const glob = require("fast-glob");
const findUp = require("find-up");
const { importModule } = require("./importModule");

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
        return importModule(path);
    }

    path = await findUp("webiny.root.js");
    if (path) {
        return require(path);
    }

    throw new Error("Couldn't detect Webiny project.");
}

class Project {
    root;
    config;

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

    // getApplication(applicationRoot) {
    //     TODO: refactor `getProjectApplication(dir)` to run `getProject().getApplication(dir)`
    // }

    /**
     * @private
     * @internal
     */
    async init() {
        const projectApplications = await glob(
            join(this.root, "apps/**/webiny.application*.{ts,js}").replace(/\\/g, "/"),
            { onlyFiles: true, ignore: ["**/node_modules/**"] }
        );

        console.log(projectApplications);
        // TODO: instantiate project apps
    }

    static async load() {
        const root = await getRoot();
        const config = await getConfig();
        const project = new Project(root, config);
        await project.init();
        return project;
    }
}

module.exports = { Project };
