import { createGenericContext } from "@webiny/app";
import type { RedirectDto } from "~/domain/Redirect";

export interface RedirectRowContext {
    redirect: RedirectDto;
}

const { Provider, useHook } = createGenericContext<RedirectRowContext>("RedirectContext");

export const useRedirect = useHook;
export const RedirectProvider = Provider;
