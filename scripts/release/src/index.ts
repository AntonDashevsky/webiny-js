#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ConsoleLogger } from "./ConsoleLogger";
import { getReleaseType } from "./releaseTypes";

// create the CLI parser
const cli = yargs(hideBin(process.argv));

// Disable default handling of `--version` parameter.
cli.version(false);

interface ReleaseArgs {
    type?: string;
    tag?: string;
    gitReset?: boolean;
    version?: string;
    createGithubRelease?: boolean | string;
    printVersion?: boolean;
}

async function runRelease() {
    const {
        type,
        tag,
        gitReset = true,
        version,
        createGithubRelease,
        printVersion
    } = cli.argv as ReleaseArgs;

    console.log({ type, tag, gitReset, version });
    if (!type) {
        throw Error(`Missing required "--type" option.`);
    }

    const Release = getReleaseType(type);

    const logger = new ConsoleLogger();
    const release = new Release(logger);

    if (tag) {
        release.setTag(tag);
    }

    if (version) {
        release.setVersion(version);
    }

    release.setResetAllChanges(Boolean(gitReset));

    if (createGithubRelease) {
        release.setCreateGithubRelease(createGithubRelease);
    }

    if (printVersion) {
        const { version } = await release.versionPackages();

        console.log(version);
    } else {
        await release.execute();
    }
}

(async () => {
    try {
        await runRelease();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
