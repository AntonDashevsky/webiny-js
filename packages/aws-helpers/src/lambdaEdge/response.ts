import { CloudFrontResultResponse } from "./types.js";

export function notFoundResponse(message?: string): CloudFrontResultResponse {
    return {
        status: "404",
        statusDescription: "Not found",
        body: message || "Not found"
    };
}
