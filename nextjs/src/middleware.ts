import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isPreview = request.nextUrl.searchParams.has("preview.document");

    if (isPreview) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        return res;
    }

    return NextResponse.next();
}
