import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constant";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;

    const ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${ENDPOINT}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: "Me failed" }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}

