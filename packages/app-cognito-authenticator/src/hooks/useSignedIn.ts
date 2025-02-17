import { useAuthenticator } from "./useAuthenticator.js";

interface SignedInState {
    shouldRender: boolean;
}

export function useSignedIn(): SignedInState {
    const { authState } = useAuthenticator();

    return {
        shouldRender: authState === "signedIn"
    };
}
