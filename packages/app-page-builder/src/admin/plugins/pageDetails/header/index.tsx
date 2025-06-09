import React from "react";
import { type PbPageDetailsPlugin } from "~/types.js";
import Header from "./Header.js";
import RevisionSelector from "./revisionSelector/RevisionSelector.js";
import PublishRevision from "./publishRevision/PublishRevision.js";
import EditRevision from "./editRevision/EditRevision.js";
import DeletePage from "./deletePage/DeletePage.js";
import PageOptionsMenu from "./pageOptionsMenu/PageOptionsMenu.js";

const plugins: PbPageDetailsPlugin[] = [
    {
        name: "pb-page-details-header",
        type: "pb-page-details-revision-content-preview",
        render(props) {
            return <Header {...props} />;
        }
    },
    {
        name: "pb-page-details-revision-selector",
        type: "pb-page-details-header-left",
        render() {
            return <RevisionSelector />;
        }
    },
    {
        name: "pb-page-details-header-edit",
        type: "pb-page-details-header-right",
        render() {
            return <EditRevision />;
        }
    },
    {
        name: "pb-page-details-header-publish",
        type: "pb-page-details-header-right",
        render() {
            return <PublishRevision />;
        }
    },
    {
        name: "pb-page-details-header-delete",
        type: "pb-page-details-header-right",
        render() {
            return <DeletePage />;
        }
    },
    {
        name: "pb-page-details-header-options-menu",
        type: "pb-page-details-header-right",
        render(props) {
            return <PageOptionsMenu {...props} />;
        }
    }
];

export default plugins;
