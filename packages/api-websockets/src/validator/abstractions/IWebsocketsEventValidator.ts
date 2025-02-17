import { IWebsocketsEvent, IWebsocketsEventData, IWebsocketsIncomingEvent } from "~/handler/types.js";

export type IWebsocketsEventValidatorValidateParams = IWebsocketsIncomingEvent;

export interface IWebsocketsEventValidator {
    /**
     * @throws {Error}
     */
    validate<T extends IWebsocketsEventData = IWebsocketsEventData>(
        params: IWebsocketsEventValidatorValidateParams
    ): Promise<IWebsocketsEvent<T>>;
}
