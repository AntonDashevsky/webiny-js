import React from "react";
import { Layout } from "~/pages/PagesList/components/Layout/index.js";
import { Main } from "~/pages/PagesList/components/Main/index.js";
import { Sidebar } from "~/pages/PagesList/components/Sidebar/index.js";
import { DocumentListPresenterProvider } from "~/pages/PagesList/presenters/DocumentListPresenterContext.js";

export const DocumentList = () => {
    return (
        <DocumentListPresenterProvider>
            <Layout main={<Main />} sidebar={<Sidebar />} />
        </DocumentListPresenterProvider>
    );
};
