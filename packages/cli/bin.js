#!/usr/bin/env node
import "tsx/esm";

// Suppress punycode warnings. This is a known issue we can't fix.
import "./utils/suppressPunycodeWarnings.js";

import { Cli } from "@webiny/cli-core";
import { ensureSystemRequirements } from "@webiny/system-requirements";
import { definitions as extensionDefinitions } from "@webiny/extensions/definitions.js";

// Ensure system requirements are met.
ensureSystemRequirements();

const cli = await Cli.init({ extensions: extensionDefinitions });

await cli.run(process.argv);
