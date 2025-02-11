import path from "path";
import fs from "fs";
import { getProject } from "@webiny/cli/utils/index.js";

export const DATABASE_SETUPS = {
    DDB: "ddb",
    DDB_ES: "ddb-es",
    DDB_OS: "ddb-os"
};

export const DATABASE_SETUPS_LABELS = {
    [DATABASE_SETUPS.DDB]: "Amazon DynamoDB",
    [DATABASE_SETUPS.DDB_ES]: "Amazon DynamoDB + Amazon Elasticsearch Service",
    [DATABASE_SETUPS.DDB_OS]: "Amazon DynamoDB + Amazon OpenSearch Service"
};

// In order to get the database setup, we check for existence of `elasticSearch`
//  or `openSearch` strings within the `apps/core/webiny.application.ts` file.
export const getDatabaseSetup = () => {
    const project = getProject();
    const webinyAppTsPath = path.join(project.root, "apps", "core", "webiny.application.ts");

    const webinyAppTs = fs.readFileSync(webinyAppTsPath, "utf8");
    if (webinyAppTs.includes("elasticSearch")) {
        return "ddb-es";
    }

    if (webinyAppTs.includes("openSearch")) {
        return "ddb-os";
    }

    return "ddb";
};

export const getDatabaseSetupLabel = () => {
    const setup = getDatabaseSetup();
    return DATABASE_SETUPS_LABELS[setup];
};
