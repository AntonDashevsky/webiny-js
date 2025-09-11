import React, { useMemo } from "react";
import { config as appConfig } from "@webiny/app/config.js";
import { useWcp } from "~/index.js";
import { Tag } from "@webiny/admin-ui";

export const WebinyVersion = () => {
    const wbyVersion = appConfig.getKey("WEBINY_VERSION", process.env.REACT_APP_WEBINY_VERSION);
    const wcp = useWcp();

    const wcpBadge = useMemo(() => {
        const wcpProject = wcp.getProject();
        if (!wcpProject) {
            return null;
        }

        return <Tag variant={"accent"} content={"WCP"} className={"wby-ml-sm-extra"} />;
    }, []);

    return (
        <div className={"wby-flex wby-items-center"}>
            Webiny v{wbyVersion}
            {wcpBadge}
        </div>
    );
};
