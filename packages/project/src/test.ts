import { ProjectSdk } from "./ProjectSdk.js";
import { Transform } from "node:stream";

const cwd = process.cwd();
const projectSdk = ProjectSdk.init(cwd);

const buildProcesses = await projectSdk.buildApp({
    app: 'api',
    env: 'dev',
});

function createPrefixer(prefix: string) {
    // This returns a Transform stream that prefixes each line
    return new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            const str = chunk.toString();
            const lines = str.split(/\r?\n/);
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() !== "") {
                    this.push(`${prefix}: ${lines[i]}\n`);
                }
            }
            callback();
        }
    });
}

buildProcesses.forEach(watchProcess => {
    const { packageName, process: childProcess } = watchProcess;

    if (childProcess.stdout) {
        const prefixedStdout = createPrefixer(packageName);
        childProcess.stdout.pipe(prefixedStdout).pipe(process.stdout);
    }

    if (childProcess.stderr) {
        const prefixedStderr = createPrefixer(packageName);
        childProcess.stderr.pipe(prefixedStderr).pipe(process.stderr);
    }
});