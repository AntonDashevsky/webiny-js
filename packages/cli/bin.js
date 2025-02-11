#!/usr/bin/env node
import "tsx";

// @ts-nocheck Migration
(async () => {
    // Suppress punycode warnings. This is a known issue which we can't fix.
    await import("./utils/suppressPunycodeWarnings.js");

    // Ensure system requirements are met.
    const { ensureSystemRequirements } = await import("@webiny/system-requirements");
    ensureSystemRequirements();

    // Run the actual CLI.
    await import("./cli.js");
})();
