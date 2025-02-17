import { BaseActionConfig } from "./BaseAction.js";
import { ButtonAction, ButtonActionType } from "./ButtonAction.js";
import { MenuItemAction, MenuItemActionType } from "./MenuItemAction.js";

export type ActionsConfig = (
    | BaseActionConfig<ButtonActionType>
    | BaseActionConfig<MenuItemActionType>
)[];

export const Actions = {
    ButtonAction,
    MenuItemAction
};
