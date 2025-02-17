import { createResolve } from "../../../resolve.js";

const resolve = createResolve(import.meta.url);

export default {
    presets: [
        [
            resolve("@babel/preset-env"),
            {
                targets: {
                    node: "20"
                }
            }
        ],
        resolve("@babel/preset-typescript")
    ]
};
