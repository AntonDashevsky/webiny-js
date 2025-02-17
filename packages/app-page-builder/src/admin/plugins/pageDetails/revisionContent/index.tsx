import * as React from "react";
import { renderPlugins } from "@webiny/app/plugins/index.js";
import { PbPageDetailsPlugin, PbPageDetailsRevisionContentPlugin } from "../../../../types.js";
import { Tabs } from "@webiny/ui/Tabs/index.js";

const plugin: PbPageDetailsPlugin = {
    name: "pb-page-details-revision-content",
    type: "pb-page-details",
    render(props) {
        return (
            <Tabs>
                {renderPlugins<PbPageDetailsRevisionContentPlugin>(
                    "pb-page-details-revision-content",
                    props,
                    {
                        wrapper: false
                    }
                )}
            </Tabs>
        );
    }
};

export default plugin;
