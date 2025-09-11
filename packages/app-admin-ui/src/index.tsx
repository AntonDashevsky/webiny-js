import React from "react";
import { Layout } from "./Layout.js";
import { Navigation } from "./Navigation.js";
import { UserMenu } from "~/UserMenu.js";
import { Dialog } from "./Dialog.js";
import { NotFound } from "./NotFound.js";
import { Dashboard } from "./Dashboard.js";
import { Logo } from "./Logo.js";

export const AdminUI = () => {
    return (
        <>
            <Dashboard />
            <Dialog />
            <Layout />
            <Navigation />
            <NotFound />
            <UserMenu />
            <Logo />
        </>
    );
};
