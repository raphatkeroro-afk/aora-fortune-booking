import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, status } = await request.json();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Missing Supabase config" }, { status: 500 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/bookings?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify({ status })
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data[0] });
}
