import { register } from "tsx/esm/api";
import { workerData } from "worker_threads";

register();

(async () => {
    await import(workerData.scriptPath);
})();
