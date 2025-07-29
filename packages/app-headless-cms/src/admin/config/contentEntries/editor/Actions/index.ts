import type { BaseActionConfig } from "./BaseAction";
import type { ButtonActionType } from "./ButtonAction";
import { ButtonAction } from "./ButtonAction";
import type { MenuItemActionType } from "./MenuItemAction";
import { MenuItemAction } from "./MenuItemAction";

export type ActionsConfig = (
    | BaseActionConfig<ButtonActionType>
    | BaseActionConfig<MenuItemActionType>
)[];

export const Actions = {
    ButtonAction,
    MenuItemAction
};
