import { ErrorResponse, NotFoundResponse, Response } from "@webiny/handler-graphql";
import type { Resolvers } from "@webiny/handler-graphql/types.js";
import type { PbContext } from "~/graphql/types.js";
import { GqlTranslatedCollectionMapper } from "~/translations/translatedCollection/graphql/mappers/GqlTranslatedCollectionMapper.js";
import { SaveTranslatedCollectionUseCase } from "~/translations/translatedCollection/useCases/SaveTranslatedCollectionUseCase.js";
import { GetOrCreateTranslatedCollectionUseCase } from "~/translations/translatedCollection/useCases/GetOrCreateTranslatedCollectionUseCase.js";
import {
    DeleteTranslatedCollectionUseCase,
    GetTranslatableCollectionUseCase
} from "~/translations/index.js";

interface GetTranslatedCollectionParams {
    collectionId: string;
    languageCode: string;
}

interface DeleteTranslatedCollectionParams {
    collectionId: string;
    languageCode?: string;
}

interface UpdateTranslatedCollectionParams {
    collectionId: string;
    languageCode: string;
    items: Array<{ itemId: string; value?: string }>;
}

export const translatedCollectionResolvers: Resolvers<PbContext> = {
    TranslationsQuery: {
        getTranslatedCollection: async (_, args, context) => {
            try {
                const { collectionId, languageCode } = args as GetTranslatedCollectionParams;

                const getBaseCollection = new GetTranslatableCollectionUseCase(context);
                const baseCollection = await getBaseCollection.execute(collectionId);

                if (!baseCollection) {
                    return new NotFoundResponse(
                        `TranslatableCollection ${collectionId} was not found!`
                    );
                }

                const getTranslatedCollection = new GetOrCreateTranslatedCollectionUseCase(context);
                const translatedCollection = await getTranslatedCollection.execute({
                    collectionId,
                    languageCode
                });

                const translatedCollectionDto = GqlTranslatedCollectionMapper.toDTO(
                    baseCollection,
                    translatedCollection
                );

                return new Response(translatedCollectionDto);
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    },
    TranslationsMutation: {
        saveTranslatedCollection: async (_, args, context) => {
            const { collectionId, languageCode, items } = args as UpdateTranslatedCollectionParams;

            try {
                const useCase = new SaveTranslatedCollectionUseCase(context);
                const collection = await useCase.execute({
                    collectionId,
                    languageCode,
                    items
                });

                const getBaseCollection = new GetTranslatableCollectionUseCase(context);
                const baseCollection = await getBaseCollection.execute(collectionId);

                if (!baseCollection) {
                    return new NotFoundResponse(
                        `TranslatableCollection ${collectionId} was not found!`
                    );
                }

                return new Response(
                    GqlTranslatedCollectionMapper.toDTO(baseCollection, collection)
                );
            } catch (err) {
                return new ErrorResponse(err);
            }
        },
        deleteTranslatedCollection: async (_, args, context) => {
            const { collectionId, languageCode } = args as DeleteTranslatedCollectionParams;

            try {
                const useCase = new DeleteTranslatedCollectionUseCase(context);
                await useCase.execute({ collectionId, languageCode });

                return new Response(true);
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    }
};
