import { type BaseActionConfig } from "./BaseAction.js";
import { ButtonAction, type ButtonActionType } from "./ButtonAction.js";
import { MenuItemAction, type MenuItemActionType } from "./MenuItemAction.js";

export type ActionsConfig = (
    | BaseActionConfig<ButtonActionType>
    | BaseActionConfig<MenuItemActionType>
)[];

export const Actions = {
    ButtonAction,
    MenuItemAction
};
