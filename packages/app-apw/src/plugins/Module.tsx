import React, { lazy, Suspense } from "react";
import { AddMenu as Menu, AddRoute } from "@webiny/app-admin";
import { ReactComponent as ApwIcon } from "~/assets/icons/account_tree_24dp.svg";
import { SecureRoute } from "@webiny/app-security";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout.js";
import Helmet from "react-helmet";
import { PublishingWorkflowsView } from "~/views/publishingWorkflows/index.js";
import { ContentReviewDashboard } from "~/views/contentReviewDashboard/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { usePermission } from "~/hooks/usePermission.js";

const ContentReviewEditor = lazy(
    () =>
        import(
            /* webpackChunkName: "ApwViewsContentReviewDashboardContentReviewEditor" */
            "~/views/contentReviewDashboard/ContentReviewEditor.js"
        )
);

interface LoaderProps {
    children: React.ReactElement;
}
const Loader = ({ children, ...props }: LoaderProps) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

export const Module = () => {
    const { canManageWorkflows } = usePermission();

    const manageWorkflows = canManageWorkflows();

    return (
        <>
            <Menu label={"Publishing Workflows"} name={"apw"} icon={<ApwIcon />}>
                <Menu
                    name={"apw.contentReviews"}
                    label={"Content Reviews"}
                    path={"/apw/content-reviews"}
                />
                {manageWorkflows && (
                    <Menu
                        name={"apw.publishingWorkflows"}
                        label={"Workflows"}
                        path={"/apw/publishing-workflows"}
                    />
                )}
            </Menu>
            {manageWorkflows && (
                <AddRoute
                    exact
                    path={"/apw/publishing-workflows"}
                    render={() => (
                        <SecureRoute permission={"apw.publishingWorkflows"}>
                            <AdminLayout>
                                <Helmet title={"APW - Publishing workflows"} />
                                <PublishingWorkflowsView />
                            </AdminLayout>
                        </SecureRoute>
                    )}
                />
            )}
            <AddRoute
                exact
                path={"/apw/content-reviews"}
                render={() => (
                    <>
                        <AdminLayout>
                            <Helmet title={"APW - Content Reviews"} />
                            <ContentReviewDashboard />
                        </AdminLayout>
                    </>
                )}
            />
            <AddRoute
                path={"/apw/content-reviews/:contentReviewId"}
                render={() => (
                    <>
                        <Helmet title={"APW - Content review editor"} />
                        <Loader>
                            <ContentReviewEditor />
                        </Loader>
                    </>
                )}
            />
        </>
    );
};
