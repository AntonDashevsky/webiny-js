import type { AllEcommerceSettings } from "~/features/ecommerce/settings/types";

export interface IUpdateSettings {
    execute(settings: AllEcommerceSettings): Promise<void>;
}
