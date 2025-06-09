import dotPropImmutable from "dot-prop-immutable";
import { useQuery, useMutation, type MutationTuple } from "@apollo/react-hooks";
import { useSnackbar } from "@webiny/app-admin";
import { type ApwComment } from "~/types.js";
import { useListCommentsVariables } from "~/hooks/useCommentsList.js";
import {
    CREATE_COMMENT_MUTATION,
    LIST_COMMENTS_QUERY,
    GET_COMMENT_QUERY,
    type CreateCommentMutationResponse,
    type CreateCommentMutationVariables,
    type GetCommentQueryVariables,
    type GetCommentQueryResponse
} from "~/graphql/comment.gql.js";

interface UseCommentResult {
    createComment: MutationTuple<CreateCommentMutationResponse, CreateCommentMutationVariables>[0];
    comment: ApwComment;
    loading: boolean;
}

export const useComment = (id?: string): UseCommentResult => {
    const { showSnackbar } = useSnackbar();

    const { data, loading } = useQuery<GetCommentQueryResponse, GetCommentQueryVariables>(
        GET_COMMENT_QUERY,
        {
            variables: {
                id: id as string
            },
            skip: !id
        }
    );

    const comment = dotPropImmutable.get(data, "apw.getComment.data");

    const listCommentsVariables = useListCommentsVariables();

    const [createComment] = useMutation<
        CreateCommentMutationResponse,
        CreateCommentMutationVariables
    >(CREATE_COMMENT_MUTATION, {
        refetchQueries: [{ query: LIST_COMMENTS_QUERY, variables: listCommentsVariables }],
        onCompleted: response => {
            const error = dotPropImmutable.get(response, "apw.comment.error");
            if (error) {
                showSnackbar(error.message);
                return;
            }
        },
        /*
         * We want to wait for "LIST_COMMENTS_QUERY" because we're scrolling the comments list
         * to latest comment after creating new comment which will only be there once "LIST_COMMENTS_QUERY" is finished.
         */
        awaitRefetchQueries: true
    });

    return {
        comment,
        loading,
        createComment
    };
};
