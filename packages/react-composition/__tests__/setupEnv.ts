// @ts-nocheck
// noinspection JSConstantReassignment

// This is why this file is necessary: https://github.com/ai/nanoid/issues/363

import { randomFillSync } from "crypto";

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
window.crypto = {
    getRandomValues(buffer) {
        return randomFillSync(buffer);
    }
};
