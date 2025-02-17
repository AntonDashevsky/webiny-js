import refInput from "./refInput.js";
import refInputs from "./refInputs.js";
import { createAdvancedRefRenderer } from "./advanced/index.js";
import { createSimpleRefRenderer } from "./simple/index.js";

export default [...createAdvancedRefRenderer(), refInput, refInputs, ...createSimpleRefRenderer()];
