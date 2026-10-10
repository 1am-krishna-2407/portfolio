import { NextResponse, type NextRequest } from "next/server";
import { ROLE_ALIASES } from "@/lib/constants";

// Serves role editions for shareable links like /?role=fullstack. The URL in
// the address bar stays as sent; the page comes from the prebuilt /for/<role>.
export function proxy(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("role")?.toLowerCase();
  const role = param ? ROLE_ALIASES[param] : undefined;
  if (!role) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/for/${role}`;
  url.searchParams.delete("role");
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/",
};
