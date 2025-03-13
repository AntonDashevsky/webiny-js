import React, { lazy, Suspense } from "react";
import { SecureRoute } from "@webiny/app-security";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import Helmet from "react-helmet";
import { PublishingWorkflowsView } from "~/views/publishingWorkflows";
import { ContentReviewDashboard } from "~/views/contentReviewDashboard";
import { CircularProgress } from "@webiny/ui/Progress";
import { usePermission } from "~/hooks/usePermission";
import { AdminConfig } from "@webiny/app-admin";
import { RouterConfig } from "@webiny/app/config/RouterConfig";
import { ReactComponent as ApwIcon } from "@material-design-icons/svg/outlined/account_tree.svg";

const { Route } = RouterConfig;
const { Menu } = AdminConfig;

const ContentReviewEditor = lazy(
    () =>
        import(
            /* webpackChunkName: "ApwViewsContentReviewDashboardContentReviewEditor" */
            "~/views/contentReviewDashboard/ContentReviewEditor"
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
            <AdminConfig>
                <Menu
                    name={"apw"}
                    element={
                        <Menu.Item
                            icon={<ApwIcon />}
                            label={"Publishing Workflows"}
                            path={"/apw/content-reviews"}
                        />
                    }
                />

                <Menu
                    name={"apw.contentReviews"}
                    parent={"apw"}
                    element={<Menu.Item label={"Content Reviews"} path={"/apw/content-reviews"} />}
                />
                {manageWorkflows && (
                    <Menu
                        name={"apw.publishingWorkflows"}
                        parent={"apw"}
                        element={
                            <Menu.Item label={"Workflows"} path={"/apw/publishing-workflows"} />
                        }
                    />
                )}
            </AdminConfig>
            <RouterConfig>
                {manageWorkflows && (
                    <Route
                        name={"apw.publishingWorkflows"}
                        exact
                        path={"/apw/publishing-workflows"}
                        element={
                            <SecureRoute permission={"apw.publishingWorkflows"}>
                                <AdminLayout>
                                    <Helmet title={"APW - Publishing workflows"} />
                                    <PublishingWorkflowsView />
                                </AdminLayout>
                            </SecureRoute>
                        }
                    />
                )}
                <Route
                    exact
                    name={"apw.contentReviews"}
                    path={"/apw/content-reviews"}
                    element={
                        <AdminLayout>
                            <Helmet title={"APW - Content Reviews"} />
                            <ContentReviewDashboard />
                        </AdminLayout>
                    }
                />
                <Route
                    name={"apw.contentReviewEditor"}
                    path={"/apw/content-reviews/:contentReviewId"}
                    element={
                        <>
                            <Helmet title={"APW - Content review editor"} />
                            <Loader>
                                <ContentReviewEditor />
                            </Loader>
                        </>
                    }
                />
            </RouterConfig>
        </>
    );
};
