import { Properties, toObject } from "@webiny/react-properties";
import debounce from "debounce";
import React from "react";
import { createRoot } from "react-dom/client";

// @ts-expect-error jsdom types are messing up with the repo, so they're disabled in the root package.json.
import { JSDOM } from "jsdom";
import { ArgsProvider } from "~/extensions/components/index.js";
import { RenderConfigParams } from "./renderConfig.js";

const { project, args } = JSON.parse(process.argv[2]) as RenderConfigParams;


const { default: ManifestComponent } = await import(project.paths.manifestFile.absolute);

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
  <ArgsProvider args={args}>
        <Properties onChange={onChange}>
            <ManifestComponent />
        </Properties>
    </ArgsProvider>
);
