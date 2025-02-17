import { ApwContentTypes } from "~/types.js";
import { createApwContentReviewNotification } from "~/ApwContentReviewNotification.js";

export const createContentReviewNotification = () => {
    const plugin = createApwContentReviewNotification(ApwContentTypes.CMS_ENTRY, params => {
        const { contentReviewUrl, contentUrl } = params;

        return {
            text: `
                Hi,<br /><br />
                
                You have received a <a href="${contentReviewUrl}">content review</a>, for <a href="${contentUrl}">this</a> content entry.<br />
                
                Here are the full URLs:<br /><br />
        
                Content Review: ${contentReviewUrl}<br />
                Content Entry: ${contentUrl}
            `
        };
    });

    plugin.name = `${plugin.type}.${ApwContentTypes.CMS_ENTRY}.default`;

    return plugin;
};
