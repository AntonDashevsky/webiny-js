import React from "react";
import BackButton from "./BackButton.js";
import Divider from "./Divider.js";
import PublishFormButton from "./PublishFormButton.js";
import { Name } from "./Name/index.js";
import { FormSettingsButton } from "./FormSettings/index.js";
import Revisions from "./Revisions.js";

export default [
    {
        name: "form-editor-default-bar-right-revisions-select",
        type: "form-editor-default-bar-right",
        render() {
            return <Revisions />;
        }
    },
    {
        name: "form-editor-default-bar-right-revisions-divider",
        type: "form-editor-default-bar-right",
        render() {
            return <Divider />;
        }
    },
    {
        name: "form-editor-default-bar-right-form-settings-button",
        type: "form-editor-default-bar-right",
        render() {
            return <FormSettingsButton />;
        }
    },
    {
        name: "form-editor-default-bar-right-publish-button",
        type: "form-editor-default-bar-right",
        render() {
            return <PublishFormButton />;
        }
    },

    {
        name: "form-editor-default-bar-left-back-button",
        type: "form-editor-default-bar-left",
        render() {
            return <BackButton />;
        }
    },
    {
        name: "form-editor-default-bar-left-divider",
        type: "form-editor-default-bar-left",
        render() {
            return <Divider />;
        }
    },
    {
        name: "form-editor-default-bar-left-name",
        type: "form-editor-default-bar-left",
        render() {
            return <Name />;
        }
    }
];
