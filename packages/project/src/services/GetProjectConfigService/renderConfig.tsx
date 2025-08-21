import { fork } from "child_process";
import path from "path";
import { IProjectConfigDto } from "~/abstractions/models";

const getWorkerPath = () => {
    // TODO: I have no idea why import.meta.dirname is sometimes undefined.
    // TODO: Would be nice to further investigate this.
    return path.join(import.meta.dirname || __dirname, "renderConfigWorker.js");
};

export async function renderConfig(manifestPath: string) {
    // Initially, I did the reading of config in this file directly. But then I started
    // bumping into an issue, where for some reason, the `Properties` context would not work.
    // Basically, `useProperties` would throw an error message, saying that the `Properties`
    // context is not available. So, I decided to move the reading of config into a separate
    // worker file, which is then executed in a child process.
    // This works. Why the context is not available in the main process, I have no idea.
    // I tried multiple things, but nothing worked. Lost more than a day on this.
    // Decided to move on, as this works and I don't have time to investigate this further.
    return new Promise<IProjectConfigDto>((resolve, reject) => {
        const workerPath = getWorkerPath();
        const childProcess = fork(workerPath, [manifestPath], {
            env: process.env
        });

        childProcess.on("message", (data: IProjectConfigDto) => {
            resolve(data);
        });

        childProcess.on("error", error => {
            reject(new Error(`Error while rendering project config: ${error.message}`));
        });
    });
}
