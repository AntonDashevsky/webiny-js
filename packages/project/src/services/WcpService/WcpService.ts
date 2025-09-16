import { createImplementation } from "@webiny/di-container";
import { LocalStorageService, LoggerService, WcpService } from "~/abstractions/index.js";
import { GetUser } from "./GetUser.js";
import { GenerateUserPat } from "./GenerateUserPat.js";
import { GetUserPat } from "./GetUserPat.js";
import { CreateUserPat } from "~/services/WcpService/CreateUserPat.js";
import { UrlModel } from "~/models/index.js";
import { getWcpGqlApiUrl, getWcpAppUrl } from "@webiny/wcp";
import { LogoutUser } from "~/services/WcpService/LogoutUser.js";
import { StorePatToLocalStorage } from "~/services/WcpService/StorePatToLocalStorage.js";
import { UnsetPatFromLocalStorage } from "./UnsetPatFromLocalStorage.js";

export class DefaultWcpService implements WcpService.Interface {
    constructor(
        private loggerService: LoggerService.Interface,
        private localStorageService: LocalStorageService.Interface
    ) {}

    async getUser() {
        const getUser = new GetUser({ localStorageService: this.localStorageService });
        return getUser.execute();
    }

    async login() {
        return "asd";
    }

    async logout() {
        const logout = new LogoutUser({ localStorageService: this.localStorageService });
        return logout.execute();
    }

    async generateUserPat() {
        const generateUserPat = new GenerateUserPat();
        return generateUserPat.execute({
            loggerService: this.loggerService
        });
    }

    async getUserPat(pat: string) {
        const getUserPat = new GetUserPat();
        return getUserPat.execute(pat, {
            loggerService: this.loggerService
        });
    }

    async createUserPat(data: any, userPat: string) {
        const createUserPat = new CreateUserPat();
        return createUserPat.execute(data, userPat, {
            loggerService: this.loggerService
        });
    }

    storePatToLocalStorage(pat: string) {
        const storePatToLocalStorage = new StorePatToLocalStorage({
            localStorageService: this.localStorageService
        });
        return storePatToLocalStorage.execute(pat);
    }

    unsetPatFromLocalStorage() {
        const unsetPatFromLocalStorage = new UnsetPatFromLocalStorage({
            localStorageService: this.localStorageService
        });
        return unsetPatFromLocalStorage.execute();
    }

    getWcpApiUrl() {
        return UrlModel.from(getWcpGqlApiUrl());
    }

    getWcpAppUrl() {
        return UrlModel.from(getWcpAppUrl());
    }
}

export const wcpService = createImplementation({
    abstraction: WcpService,
    implementation: DefaultWcpService,
    dependencies: [LoggerService, LocalStorageService]
});
