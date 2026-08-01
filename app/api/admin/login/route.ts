import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Missing admin password" }, { status: 500 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
