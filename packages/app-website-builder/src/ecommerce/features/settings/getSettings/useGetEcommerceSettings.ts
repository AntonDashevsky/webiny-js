import { useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetSettingsRepository } from "./GetSettingsRepository";
import { GetSettingsGqlGateway } from "./GetSettingsGraphQlGateway";
import { settingsCache } from "../settingsCache";
import type { IGetEcommerceSettings } from "./IGetEcommerceSettings";
import type { IEcommerceSettings } from "../IEcommerceSettings";

class KiboSettings implements IGetEcommerceSettings {
    private readonly decoratee: IGetEcommerceSettings;

    constructor(decoratee: IGetEcommerceSettings) {
        this.decoratee = decoratee;
    }

    async execute(name: string): Promise<IEcommerceSettings | undefined> {
        if (name === "KiboCommerce") {
            return {
                apiHost: String(process.env.WEBINY_ADMIN_KIBO_API_HOST),
                sharedSecret: String(process.env.WEBINY_ADMIN_KIBO_SHARED_SECRET),
                clientId: String(process.env.WEBINY_ADMIN_KIBO_CLIENT_ID),
                authToken: "eyJhbGciOiJIUzI1NiIsImtpZCI6IjN3TlR3TkdPS2hldyt1OWFaR3BPOGc9PSIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tL2FwcF9jbGFpbXMiOnsic3NsIjoiMCIsImVudCI6IjAiLCJtdHIiOiIwIiwidWMiOiIwIiwicm5kIjo4NDE5MjM4MTcsImFpZCI6Ijk1MTJkYjg4ZTg3NDQ0NDZhZDQyODUwZDJjYTRkZDhiIiwiYWtleSI6ImQ0ZTliYjUud2ViaW55X3BiX3BvYy4xLjAuMC5SZWxlYXNlIiwiYnYiOlswLDY1NTU2LDEsMzM1NjI2MjQsMiwzMzU1NDQzMiwzLDUwMzMxNjQ4LDUsNjcxMDkwMjQsNiwxMDc0MDAzOTY4LDksNTI0Mjg4XSwiZXhwIjoiMjAyNS0wNy0xMFQxMToxMTo0MiIsImVudiI6InByb2QiLCJiLkFwcE5hbWUiOiJ3ZWJpbnlfcGJfcG9jIn0sIm5iZiI6MTc1MjE0MjMwMiwiZXhwIjoxNzUyMTQ1OTAyLCJpYXQiOjE3NTIxNDIzMDIsImlzcyI6Imh0dHBzOi8vd3d3LmtpYm9jb21tZXJjZS5jb20iLCJhdWQiOiJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tIn0.ZasTohXfH18qIUjtGGjHjGWrHlcBtJGRkI6NOmOasxk"//String(process.env.WEBINY_ADMIN_KIBO_AUTH_TOKEN)
            };
        }

        return this.decoratee.execute(name);
    }
}

export const useGetEcommerceSettings = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        return new GetSettingsRepository(
            settingsCache,
            new KiboSettings(new GetSettingsGqlGateway(client))
        );
    }, []);

    const getSettings = async (name: string) => {
        return repository.execute(name);
    };

    return { getSettings };
};
