import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // if (userId && req.nextUrl.pathname === "/") {
  //   const url = new URL("/dashboard", req.nextUrl.origin);
  //   return NextResponse.redirect(url);
  // }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
