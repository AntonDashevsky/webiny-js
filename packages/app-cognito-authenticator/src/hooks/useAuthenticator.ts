import { useContext } from "react";
import { AuthenticatorContext } from "../Authenticator.js";

export function useAuthenticator() {
    return useContext(AuthenticatorContext);
}
