import React from "react";
import { createRoot } from "react-dom/client";
import { Properties, toObject } from "@webiny/react-properties";
import debounce from "debounce";
import { IProjectConfigDto } from "~/abstractions/models";

// @ts-expect-error jsdom types are messing up with the repo, so they're disabled in the root package.json.
import { JSDOM } from "jsdom";

const webinyConfigTsxPath = process.argv[2];

const { default: ManifestComponent } = await import(webinyConfigTsxPath);

await new Promise<IProjectConfigDto>(resolve => {
    const onChange = debounce((value: any) => {
        process.send!(toObject(value));
        process.exit(0);
    });

    const { window } = new JSDOM(`<div id="root"/>`);

    global.window = window;
    global.document = window.document;

    const root = window.document.getElementById("root");

    const reactRoot = createRoot(root);
    reactRoot.render(
        <Properties onChange={onChange}>
            <ManifestComponent />
        </Properties>
    );
});
