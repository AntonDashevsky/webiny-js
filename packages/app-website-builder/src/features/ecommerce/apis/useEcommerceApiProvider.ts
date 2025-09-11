import { EcommerceApiProvider } from "./EcommerceApiProvider";
import { useGetEcommerceSettings } from "~/features";

let ecommerceApiProvider: EcommerceApiProvider;

export const useEcommerceApiProvider = () => {
    const { getSettings } = useGetEcommerceSettings();

    if (!ecommerceApiProvider) {
        ecommerceApiProvider = new EcommerceApiProvider(async (name: string) => {
            const settings = await getSettings();
            return settings[name];
        });
    }

    return ecommerceApiProvider;
};
