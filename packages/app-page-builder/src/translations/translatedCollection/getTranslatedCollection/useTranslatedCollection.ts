import { useState, useMemo, useEffect } from "react";
import { autorun, toJS } from "mobx";
import { useApolloClient } from "@apollo/react-hooks";
import { TranslatedCollection } from "~/translations/translatedCollection/TranslatedCollection.js";
import { IGetTranslatedCollectionRepository } from "~/translations/translatedCollection/getTranslatedCollection/IGetTranslatedCollectionRepository.js";
import { IGetTranslatedCollectionGateway } from "~/translations/translatedCollection/getTranslatedCollection/IGetTranslatedCollectionGateway.js";
import { GetTranslatedCollectionGateway } from "~/translations/translatedCollection/getTranslatedCollection/GetTranslatedCollectionGateway.js";
import { GetTranslatedCollectionRepository } from "~/translations/translatedCollection/getTranslatedCollection/GetTranslatedCollectionRepository.js";
import { translatedCollectionCache } from "~/translations/translatedCollection/translatedCollectionCache.js";
import { GenericRecord } from "@webiny/app/types.js";

export const useTranslatedCollection = <
    TContext extends GenericRecord<string> = GenericRecord<string>
>(
    collectionId: string,
    languageCode: string
) => {
    const [vm, setVm] = useState<{
        loading: boolean;
        translatedCollection: TranslatedCollection<TContext> | undefined;
    }>({
        translatedCollection: undefined,
        loading: false
    });

    const client = useApolloClient();

    const gateway = useMemo<IGetTranslatedCollectionGateway>(() => {
        return new GetTranslatedCollectionGateway(client);
    }, [client]);

    const repository = useMemo<IGetTranslatedCollectionRepository>(() => {
        return new GetTranslatedCollectionRepository(gateway, translatedCollectionCache);
    }, [gateway]);

    useEffect(() => {
        repository.execute(collectionId, languageCode);
    }, [repository, collectionId, languageCode]);

    useEffect(() => {
        autorun(() => {
            const loading = repository.getLoading();
            const translatedCollection = repository.getTranslatedCollection<TContext>(
                collectionId,
                languageCode
            );

            setVm(() => ({
                loading: loading.isLoading,
                translatedCollection: toJS(translatedCollection)
            }));
        });
    }, [repository, collectionId, languageCode]);

    return { loading: vm.loading, translatedCollection: vm.translatedCollection };
};
