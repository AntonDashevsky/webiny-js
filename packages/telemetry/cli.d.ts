export declare interface SendEventParams {
    event: string;
    user?: string;
    version?: string;
    properties: Record<string, any>;
}

export declare function sendEvent(params: SendEventParams): Promise<void>;

export declare function isEnabled(): boolean
