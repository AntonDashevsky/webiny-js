import { Abstraction } from "@webiny/di-container";

interface IIsTelemetryEnabled {
    execute(): Promise<boolean>;
}

export const IsTelemetryEnabled = new Abstraction<IIsTelemetryEnabled>("IsTelemetryEnabled");

export namespace IsTelemetryEnabled {
    export type Interface = IIsTelemetryEnabled;
}
