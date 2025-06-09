import { autorun, toJS } from "mobx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type GenericRecord } from "@webiny/app/types.js";
import { useApolloClient } from "@apollo/react-hooks";
import { type PbDataSource } from "~/types.js";
import { dataSourceCache } from "~/features/dataSource/loadDataSource/dataSourceCache.js";
import {
    DataRequest,
    type IResolveDataSourceRepository
} from "~/features/dataSource/loadDataSource/IResolveDataSourceRepository.js";
import { ResolveDataSourceRepository } from "~/features/dataSource/loadDataSource/ResolveDataSourceRepository.js";
import { ResolveDataSourceGqlGateway } from "~/features/dataSource/loadDataSource/ResolveDataSourceGqlGateway.js";
import { type Decorator } from "@webiny/react-composition";
import { ResolveDataSourceMockGateway } from "~/features/dataSource/loadDataSource/ResolveDataSourceMockGateway.js";

interface DataSourceLoaderVm {
    data: GenericRecord;
}

const decorators: { repository: Decorator<IResolveDataSourceRepository>[] } = {
    repository: []
};

const useLoadDataSourceHook = (dataSource: PbDataSource, paths: string[]) => {
    const client = useApolloClient();
    const [vm, setVm] = useState<DataSourceLoaderVm>({ data: {} });

    const dataRequest = useMemo(() => {
        return dataSource
            ? DataRequest.create({
                  ...dataSource,
                  paths
              })
            : undefined;
    }, [dataSource, paths]);

    const repository = useMemo(() => {
        const gateway = new ResolveDataSourceMockGateway(new ResolveDataSourceGqlGateway(client));

        return decorators.repository.reduce<IResolveDataSourceRepository>(
            (repository, decorator) => {
                return decorator(repository);
            },
            new ResolveDataSourceRepository(gateway, dataSourceCache)
        );
    }, [client, decorators.repository.length]);

    useEffect(() => {
        if (!dataRequest) {
            return;
        }

        repository.resolveData(dataRequest);

        return autorun(() => {
            const data = repository.getData(dataRequest.getKey());
            setVm({ data: data ? toJS(data) : {} });
        });
    }, [repository, dataRequest]);

    const loadData = useCallback(
        (params: GenericRecord) => {
            const request = DataRequest.create({
                ...dataSource,
                config: {
                    ...dataSource?.config,
                    ...params
                },
                paths
            });

            repository.resolveData(request);
        },
        [repository]
    );

    return { data: vm.data, loadData };
};

export const useLoadDataSource = Object.assign(useLoadDataSourceHook, {
    /**
     * ATTENTION!!!
     * This is an EXTREMELY EXPERIMENTAL feature, and should not be used outside of core Webiny packages.
     *
     * @internal
     */
    decorateRepository: (decorator: Decorator<IResolveDataSourceRepository>) => {
        decorators.repository.push(decorator);

        return () => {
            decorators.repository = decorators.repository.filter(dec => dec !== decorator);
        };
    }
});
