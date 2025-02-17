import { ApwContentTypes } from "~/types.js";
import { createApwContentReviewNotification } from "~/ApwContentReviewNotification.js";

export const createContentReviewNotification = () => {
    const plugin = createApwContentReviewNotification(ApwContentTypes.PAGE, params => {
        const { contentReviewUrl, contentUrl } = params;
        return {
            text: `
                Hi,<br /><br />
                
                You have received a <a href="${contentReviewUrl}">content review</a>, for <a href="${contentUrl}">this</a> page.<br /><br />
                
                Here are the full URLs:<br /><br />
        
                Content Review: ${contentReviewUrl}<br />
                Page: ${contentUrl}
            `
        };
    });

    plugin.name = `${plugin.type}.${ApwContentTypes.PAGE}.default`;

    return plugin;
};
