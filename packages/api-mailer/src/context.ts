import { ContextPlugin } from "@webiny/api";
import type { MailerContext } from "./types.js";
import { createTransporterCrud } from "~/crud/transporter.crud.js";
import { createSettingsCrud } from "~/crud/settings.crud.js";

export const createMailerContext = () => {
    return new ContextPlugin<MailerContext>(async context => {
        context.mailer = {
            ...(await createTransporterCrud(context)),
            ...(await createSettingsCrud(context))
        };
    });
};
