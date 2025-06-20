import React from "react";
import { CommercePlugin, type CommerceApi } from "./commercePlugin";
import { KiboClient } from "./kiboClient";
import { authToken } from "../../../kiboAuthToken";

type KiboCommerceSettings = typeof settings;

const settings = {
    apiHost: String(process.env.WEBINY_ADMIN_KIBO_API_HOST),
    sharedSecret: String(process.env.WEBINY_ADMIN_KIBO_SHARED_SECRET),
    clientId: String(process.env.WEBINY_ADMIN_KIBO_CLIENT_ID),
    authToken
};

const productCache = new Map<string, any>();

function initEcommerceApi(settings: KiboCommerceSettings) {
    const kiboClient = new KiboClient(settings, {});
    const PAGE_SIZE = 16;

    const transformProduct = (resource: any) => ({
        ...resource,
        id: resource?.productCode,
        title: resource?.content?.productName,
        handle: resource?.productCode,
        image: {
            src: resource?.content?.productImages[0]?.imageUrl
        }
    });

    const transformCategory = (resource: any) => ({
        ...resource,
        id: resource?.categoryCode,
        title: resource?.content?.name,
        handle: resource?.content?.slug,
        image: {
            src: resource?.content?.categoryImages[0]?.imageUrl
        }
    });

    const service: CommerceApi = {
        product: {
            async findById(productCode: string) {
                if (productCache.has(productCode)) {
                    return transformProduct(productCache.get(productCode));
                }
                const [product] = await kiboClient.getItemsByProductCode([productCode]);

                productCache.set(productCode, product);

                return transformProduct(product);
            },
            async search(searchTerm: string) {
                const searchOptions = {
                    query: searchTerm ? `${searchTerm}` : "",
                    startIndex: 0,
                    pageSize: PAGE_SIZE
                };
                const products = await kiboClient.performProductSearch(searchOptions);
                return products.items?.map(transformProduct);
            },
            getRequestObject(productCode: string) {
                return productCode;
            }
        },
        category: {
            async findById(categoryCode: string) {
                const categories = await kiboClient.getItemsByCategoryCode([categoryCode]);
                return transformCategory(categories[0]);
            },
            async search(searchTerm: string) {
                const searchOptions = {
                    filter: searchTerm
                        ? `content.name cont ${searchTerm} or categoryCode eq ${searchTerm}`
                        : ""
                };

                const categories = await kiboClient.performCategorySearch(searchOptions);
                return categories.items?.map(transformCategory);
            },
            async findByHandle(handle: string) {
                const searchOptions = {
                    filter: `content.slug eq ${handle}`
                };
                const categories = await kiboClient.performCategorySearch(searchOptions);
                const category = categories?.items?.[0];
                return category && transformCategory(category);
            },

            getRequestObject(categoryCode: string) {
                return categoryCode;
            }
        }
    };

    return service;
}

export const Extension = () => {
    return (
        <CommercePlugin name={"KiboCommerce"} init={() => initEcommerceApi(settings)}>
            {/*<PageType
                name={"kiboProductPage"}
                label={"Kibo Product Page"}
                resourceType="product"
                previewPath={"/product/{product.id}"}
            />*/}
        </CommercePlugin>
    );
};
