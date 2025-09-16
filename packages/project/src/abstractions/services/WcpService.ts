import { Abstraction } from "@webiny/di-container";
import { IUrlModel, IWcpUserModel, IWcpUserPatModel } from "~/abstractions/models/index.js";

export interface IWcpService {
    login(): Promise<string | null>;

    logout(): void;

    getUser(): Promise<IWcpUserModel | null>;

    generateUserPat(): Promise<string>;

    getUserPat(pat: string): Promise<IWcpUserPatModel | null>;

    createUserPat(patData: any, userPat: string): Promise<IWcpUserPatModel | null>;

    storePatToLocalStorage(pat: string): void;

    unsetPatFromLocalStorage(): void;

    getWcpApiUrl(): IUrlModel;

    getWcpAppUrl(): IUrlModel;
}

export const WcpService = new Abstraction<IWcpService>("WcpService");

export namespace WcpService {
    export type Interface = IWcpService;
}
