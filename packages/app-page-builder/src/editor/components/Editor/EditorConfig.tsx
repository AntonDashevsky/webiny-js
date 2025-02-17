import { createConfigPortal } from "~/utils/createConfigPortal.js";

const { ConfigApply, Config } = createConfigPortal("Editor");

export const EditorConfig = Config;
export const EditorConfigApply = ConfigApply;
