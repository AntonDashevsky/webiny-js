import { ErrorResponse, Response } from "@webiny/handler-graphql";
import type { Resolvers } from "@webiny/handler-graphql/types.js";
import type { PbContext } from "~/graphql/types.js";
import { SaveTranslatableCollectionUseCase } from "~/translations/translatableCollection/useCases/SaveTranslatableCollectionUseCase.js";
import type { GqlTranslatableItemDTO } from "~/translations/translatableCollection/graphql/GqlTranslatableItemDTO.js";
import { GetTranslatableCollectionByIdRepository } from "~/translations/translatableCollection/repository/GetTranslatableCollectionByIdRepository.js";
import { GqlTranslatableCollectionMapper } from "~/translations/translatableCollection/graphql/GqlTranslatableCollectionMapper.js";
import { DeleteTranslatableCollectionUseCase } from "~/translations/index.js";

interface UpdateTranslatableCollectionParams {
    collectionId: string;
    items: GqlTranslatableItemDTO[];
}

interface DeleteTranslatableCollectionParams {
    collectionId: string;
}

export const translatableCollectionResolvers: Resolvers<PbContext> = {
    TranslationsQuery: {
        getTranslatableCollection: async (_, args, context) => {
            try {
                const getById = new GetTranslatableCollectionByIdRepository(context);
                const collection = await getById.execute(args.collectionId);

                return new Response(GqlTranslatableCollectionMapper.toDTO(collection));
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    },
    TranslationsMutation: {
        saveTranslatableCollection: async (_, args, context) => {
            const { collectionId, items } = args as UpdateTranslatableCollectionParams;

            try {
                const useCase = new SaveTranslatableCollectionUseCase(context);
                const collection = await useCase.execute({
                    collectionId,
                    items
                });

                return new Response(GqlTranslatableCollectionMapper.toDTO(collection));
            } catch (err) {
                return new ErrorResponse(err);
            }
        },
        deleteTranslatableCollection: async (_, args, context) => {
            const { collectionId } = args as DeleteTranslatableCollectionParams;

            try {
                const useCase = new DeleteTranslatableCollectionUseCase(context);
                await useCase.execute({ collectionId });

                return new Response(true);
            } catch (err) {
                return new ErrorResponse(err);
            }
        }
    }
};
