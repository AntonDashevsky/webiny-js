import type { AllEcommerceSettings } from "../types.js";

export interface IGetSettings {
    execute(): Promise<AllEcommerceSettings>;
}
