import advanced from "./advanced/index.js";
import animation from "./animation/index.js";
import deleteElement from "./delete/index.js";
import clone from "./clone/index.js";
import background from "./background/index.js";
import border from "./border/index.js";
import shadow from "./shadow/index.js";
import padding from "./padding/index.js";
import margin from "./margin/index.js";
import mirrorCell from "./mirror-cell/index.js";
import width from "./width/index.js";
import height from "./height/index.js";
import align from "./align/index.js";
import save from "./save/index.js";
import link from "./link/index.js";
import action from "./action/index.js";
import grid from "./grid/index.js";
import cell from "./cell/index.js";

export default [
    advanced,
    animation,
    background,
    border,
    shadow,
    padding,
    margin,
    mirrorCell,
    ...align,
    clone,
    deleteElement,
    width,
    height,
    save,
    link,
    action,
    grid,
    cell
];
