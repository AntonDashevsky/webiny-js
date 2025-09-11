import React from "react";
import { makeDecoratable } from "~/index.js";
import { Property, useIdGenerator } from "@webiny/react-properties";

export interface TenantLogoProps {
    element: React.ReactNode;
}

const BaseTenantLogo = ({ element }: TenantLogoProps) => {
    const getId = useIdGenerator("Tenant");

    return <Property id={getId("logo")} name={"logo"} value={element} />;
};

export const TenantLogo = makeDecoratable("TenantLogo", BaseTenantLogo);
