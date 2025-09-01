import { Properties, toObject } from "@webiny/react-properties";
import debounce from "debounce";
import React from "react";
import { createRoot } from "react-dom/client";

// @ts-expect-error jsdom types are messing up with the repo, so they're disabled in the root package.json.
import { JSDOM } from "jsdom";
import { RenderConfigParams } from "./renderConfig.js";

const { project } = JSON.parse(process.argv[2]) as RenderConfigParams;

const { default: WebinyConfig } = await import(project.paths.webinyConfigFile.toString());

const onChange = debounce((value: any) => {
    if (process.send) {
        process.send(toObject(value));
    }

    process.exit();
});

const { window } = new JSDOM(`<div id="root"/>`);

global.window = window;
global.document = window.document;

const root = window.document.getElementById("root");

const reactRoot = createRoot(root);

reactRoot.render(
    <Properties onChange={onChange}>
        <WebinyConfig />
    </Properties>
);
