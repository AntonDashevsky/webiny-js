export { Okta } from "./Okta.js";
export type { OktaProps, OktaFactory } from "./Okta.js";
import { UserInfo } from "./modules/userMenu/userInfo.js";
import { UserImage } from "./modules/userMenu/userImage.js";
import { ExitTenant } from "./modules/userMenu/exitTenant.js";
import { SignOut } from "./modules/userMenu/signOut.js";
import { NotAuthorizedError } from "./components/index.js";

export const Components = {
    UserInfo,
    UserImage,
    ExitTenant,
    SignOut,
    NotAuthorizedError
};
