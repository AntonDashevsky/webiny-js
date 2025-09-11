import type { AllEcommerceSettings } from "~/features/ecommerce/settings/types.js";

export interface IUpdateSettings {
    execute(settings: AllEcommerceSettings): Promise<void>;
}
