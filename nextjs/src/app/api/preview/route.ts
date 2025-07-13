import { draftMode, cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * This route enables draft mode and redirects to the requested page pathname.
 */
export async function GET(request: Request) {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("wb.path");

    const targetPathname = `${path}?${searchParams.toString()}`;

    // TODO: implement access control, if you want to secure your preview.

    // Enable Draft Mode by setting the cookie
    const draft = await draftMode();
    draft.enable();

    cookieStore.set({
        name: "__wb_preview_params",
        value: searchParams.toString(),
        httpOnly: true,
        path: "/"
    });

    redirect(targetPathname);
}
