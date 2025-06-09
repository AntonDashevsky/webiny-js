import { useQuery } from "@apollo/react-hooks";
import dotPropImmutable from "dot-prop-immutable";
import {
    GET_CONTENT_REVIEW_QUERY,
    type GetContentReviewQueryResponse,
    type GetContentReviewQueryVariables
} from "~/graphql/contentReview.gql.js";
import { type ApwContentReview } from "~/types.js";
import { useContentReviewId } from "./useContentReviewId.js";

interface UseContentReviewParams {
    id: string;
}

interface UseContentReviewResult {
    contentReview: ApwContentReview;
    loading: boolean;
    refetch: () => Promise<any>;
}

export function useContentReview(params: UseContentReviewParams): UseContentReviewResult {
    const id = decodeURIComponent(params.id);

    const { data, loading, refetch } = useQuery<
        GetContentReviewQueryResponse,
        GetContentReviewQueryVariables
    >(GET_CONTENT_REVIEW_QUERY, {
        variables: { id },
        skip: !id
    });

    return {
        contentReview: dotPropImmutable.get(data, "apw.getContentReview.data"),
        loading,
        refetch
    };
}

export const useCurrentContentReview = (): UseContentReviewResult => {
    const { encodedId } = useContentReviewId() || { encodedId: "" };
    return useContentReview({ id: encodedId });
};
