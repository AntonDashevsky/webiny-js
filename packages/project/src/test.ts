import { ProjectSdk } from "./ProjectSdk.js";
import { Transform } from "node:stream";

const cwd = process.cwd();
const projectSdk = ProjectSdk.init(cwd);

const buildProcesses = await projectSdk.buildApp({
    app: 'core',
    env: 'dev',
});

console.log('buildProcesses', await buildProcesses)