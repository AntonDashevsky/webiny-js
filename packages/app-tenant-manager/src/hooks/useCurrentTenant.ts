import get from "lodash/get.js";
import { useQuery } from "@apollo/react-hooks";
import { useTenancy } from "@webiny/app-tenancy";
import { GET_TENANT, type GetTenantQueryResponse, type GetTenantQueryVariables } from "~/graphql/index.js";
import { type TenantItem } from "~/types.js";

interface UseCurrentTenant {
    tenant: TenantItem | null;
    loading: boolean;
}
export function useCurrentTenant(): UseCurrentTenant {
    const { tenant } = useTenancy();
    const { data, loading } = useQuery<GetTenantQueryResponse, GetTenantQueryVariables>(
        GET_TENANT,
        {
            variables: {
                id: tenant as string
            },
            skip: !tenant
        }
    );

    return {
        loading,
        tenant: loading ? null : (get(data, "tenancy.getTenant.data") as unknown as TenantItem)
    };
}
