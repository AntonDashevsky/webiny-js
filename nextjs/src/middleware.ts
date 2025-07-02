import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// Pathname prefixes to ignore.
const IGNORE_PATHS = ["/_next", "/favicon.ico", "/.well-known", "/api", "/static"];

export async function middleware(request: NextRequest) {
    const { searchParams, pathname } = request.nextUrl;
    const previewRequested = searchParams.get("wb.preview") === "true";

    // Check if the request needs to be processed.
    const isExcluded = IGNORE_PATHS.some(path => pathname.startsWith(path));
    if (isExcluded) {
        return NextResponse.next();
    }

    // Check if preview mode is currently enabled for this request.
    const previewMode = await draftMode();

    if (previewRequested) {
        // If preview mode is enabled, disable caching on the response.
        if (previewMode.isEnabled) {
            const res = NextResponse.next();
            res.headers.set(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
            );
            res.headers.set("Pragma", "no-cache");
            res.headers.set("Expires", "0");
            return res;
        }

        // Redirect to preview route, to activate Next.js draft mode.
        // https://nextjs.org/docs/app/guides/draft-mode
        const token = searchParams.get("wb.preview.token");

        return NextResponse.redirect(
            new URL(`/api/preview?wb.preview.token=${token}&wb.preview.pathname=${pathname}`, request.url)
        );
    } else if (!previewRequested && previewMode.isEnabled) {
        // If the preview flag is not set, make sure draft mode is disabled.
        previewMode.disable();

        // We must do a redirect for the draft mode cookies to get updated.
        return NextResponse.redirect(request.url);
    }

    // For non-preview requests, proceed as usual.
    return NextResponse.next();
}
