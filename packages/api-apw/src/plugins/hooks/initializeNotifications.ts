import { type ApwContext } from "~/types.js";
import { attachContentReviewAfterCreate } from "./notifications/contentReviewAfterCreate.js";
import { attachCommentAfterCreate } from "./notifications/commentAfterCreate.js";
import { attachChangeRequestAfterCreate } from "./notifications/changeRequestAfterCreate.js";

export const initializeNotifications = (context: ApwContext) => {
    attachContentReviewAfterCreate(context);
    attachCommentAfterCreate(context);
    attachChangeRequestAfterCreate(context);
};
