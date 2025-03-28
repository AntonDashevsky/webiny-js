import open from "./open/index.js";
import deploy from "./deploy/index.js";
import build from "./build/index.js";
import destroy from "./destroy/index.js";
import info from "./info/index.js";
import aws from "./aws/index.js";

export default () => [build(), open, deploy(), destroy(), info, aws];
