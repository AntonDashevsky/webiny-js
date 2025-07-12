import { AllEcommerceSettings } from "../types";

export interface IGetSettings {
    execute(): Promise<AllEcommerceSettings>;
}
