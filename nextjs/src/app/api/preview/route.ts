import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    // Parse query string parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const slug = searchParams.get("slug");

    // Check the token and next parameters
    // This secret should only be known to this Route Handler and the CMS
    if (token !== "MY_SECRET_TOKEN" || !slug) {
        return new Response("Invalid token", { status: 401 });
    }

    // Enable Draft Mode by setting the cookie
    const draft = await draftMode();
    draft.enable();

    redirect(slug);
}
