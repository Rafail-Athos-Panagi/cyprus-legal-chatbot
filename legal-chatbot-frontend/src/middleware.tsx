import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/:path*"] };

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  let cookie = request.cookies.get("next-auth.session-token");

  /* if (request.nextUrl.pathname.startsWith("/login") && cookie?.value) {
    return NextResponse.redirect("http://localhost:3000/chat-homepage");
  } */

  if (request.nextUrl.pathname.startsWith("/chat-homepage")) {
    if (!token) {
      return NextResponse.redirect("http://localhost:3000/login");
    } else if (token.user.activate === false) {
      return NextResponse.redirect("http://localhost:3000/activate-code");
    }
  }
}
