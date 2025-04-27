import { clearAuthCookies } from "@/lib/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await clearAuthCookies();
  const response = NextResponse.json({ message: "Success logout !!! " });

  return response;
}
