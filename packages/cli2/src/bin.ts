#!/usr/bin/env node
import "tsx";

// Suppress punycode warnings. This is a known issue we can't fix.
import "./utils/suppressPunycodeWarnings.js";

import { ensureSystemRequirements } from "@webiny/system-requirements";
import { Cli } from "./Cli.js";

// Ensure system requirements are met.
ensureSystemRequirements();

const cli = await Cli.init();

await cli.parse();
