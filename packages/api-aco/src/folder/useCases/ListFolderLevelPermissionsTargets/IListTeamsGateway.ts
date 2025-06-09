import type { Team } from "@webiny/api-security/types.js";

export interface IListTeamsGateway {
    execute: () => Promise<Team[]>;
}
