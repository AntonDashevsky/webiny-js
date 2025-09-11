import type { CloudFrontHeaders } from "./types.js";

export function setHeader(headers: CloudFrontHeaders, header: { key: string; value: string }) {
    headers[header.key] = [header];
}

export function getHeader(headers: CloudFrontHeaders | undefined, header: string) {
    return headers?.[header]?.[0].value;
}
