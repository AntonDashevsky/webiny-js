import { ApwContentTypes } from "~/types.js";
import { createApwChangeRequestNotification } from "~/ApwChangeRequestNotification.js";

export const createChangeRequestNotification = () => {
    const plugin = createApwChangeRequestNotification(ApwContentTypes.PAGE, params => {
        const { changeRequestUrl, contentUrl } = params;
        return {
            text: `
                Hi,<br /><br />
                
                You have received a <a href="${changeRequestUrl}">change request</a>, for <a href="${contentUrl}">this</a> page.<br /><br />
                
                Here are the full URLs:<br /><br />
        
                Change Request: ${changeRequestUrl}<br />
                Page: ${contentUrl}
            `
        };
    });

    plugin.name = `${plugin.type}.${ApwContentTypes.PAGE}.default`;

    return plugin;
};
