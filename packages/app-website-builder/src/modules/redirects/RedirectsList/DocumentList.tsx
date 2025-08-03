import React from "react";
import { Layout } from "~/modules/redirects/RedirectsList/components/Layout/index.js";
import { Main } from "~/modules/redirects/RedirectsList/components/Main/index.js";
import { Sidebar } from "~/modules/redirects/RedirectsList/components/Sidebar/index.js";
import { DocumentListPresenterProvider } from "~/modules/redirects/RedirectsList/presenters/DocumentListPresenterContext.js";

export const DocumentList = () => {
    return (
        <DocumentListPresenterProvider>
            <Layout main={<Main />} sidebar={<Sidebar />} />
        </DocumentListPresenterProvider>
    );
};
