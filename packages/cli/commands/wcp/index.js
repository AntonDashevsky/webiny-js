import { command as login } from "./login.js";
import { command as logout } from "./logout.js";
import { command as whoami } from "./whoami.js";
import { command as project } from "./project.js";
import hooks from "./hooks";

export default [login(), logout(), whoami(), project(), ...hooks()];
