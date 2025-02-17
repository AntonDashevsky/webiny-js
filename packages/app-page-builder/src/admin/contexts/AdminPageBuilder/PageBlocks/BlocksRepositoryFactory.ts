import { ApolloClient } from "apollo-client";
import { BlocksRepository } from "./BlocksRepository.js";
import { BlocksGateway } from "~/admin/contexts/AdminPageBuilder/PageBlocks/BlocksGateway.js";

class BlocksRepositoryFactory {
    private repository: BlocksRepository | undefined = undefined;

    getRepository(client: ApolloClient<any>) {
        if (!this.repository) {
            this.repository = new BlocksRepository(new BlocksGateway(client));
        }

        return this.repository;
    }
}

export const blocksRepositoryFactory = new BlocksRepositoryFactory();
