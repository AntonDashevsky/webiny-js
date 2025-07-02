import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Example: disable cache only for preview mode (cookie or query param)
    const { isEnabled } = await draftMode();
    //|| request.nextUrl.searchParams.has("preview.document");

    if (isEnabled) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.headers.set("Pragma", "no-cache");
        res.headers.set("Expires", "0");
        return res;
    }

    // For other requests, proceed normally
    return NextResponse.next();
}
