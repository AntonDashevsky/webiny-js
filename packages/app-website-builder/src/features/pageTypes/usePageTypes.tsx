import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { PageType } from "./PageType";
import { pageTypesCache } from "./pageTypesCache";

export const usePageTypes = () => {
    const [pageTypes, setPageTypes] = useState<PageType[]>([]);

    useEffect(() => {
        autorun(() => {
            const types = pageTypesCache.getItems();

            setPageTypes([...types]);
        });
    }, []);

    const addPageType = (pageType: PageType) => {
        pageTypesCache.addItems([pageType]);
    };

    const removePageType = (name: string) => {
        pageTypesCache.removeItems(type => {
            return type.name === name;
        });
    };

    return { pageTypes, addPageType, removePageType };
};
