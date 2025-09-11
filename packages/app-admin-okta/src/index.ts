export { Okta } from "./Okta.js";
export type { OktaProps, OktaFactory } from "./Okta.js";
import { UserInfo } from "./modules/userMenu/UserInfo.js";
import { UserImage } from "./modules/userMenu/UserImage.js";
import { ExitTenant } from "./modules/userMenu/ExitTenant.js";
import { SignOut } from "./modules/userMenu/SignOut.js";
import { NotAuthorizedError } from "./components/index.js";

export const Components = {
    UserInfo,
    UserImage,
    ExitTenant,
    SignOut,
    NotAuthorizedError
};
