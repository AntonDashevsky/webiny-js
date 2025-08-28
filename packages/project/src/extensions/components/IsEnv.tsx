import React from "react";
import { getConfigRenderArgs } from "../getConfigRenderArgs.js";

type IsEnvProps = {
    children: React.ReactNode;
    env: string | string[];
};

export const IsEnv: React.FC<IsEnvProps> = ({ children, env }) => {
    const { args = {} } = getConfigRenderArgs();
    const isMatchingEnv = Array.isArray(env) ? env.includes(args.env) : args.env === env;

    return isMatchingEnv ? <>{children}</> : null;
};
