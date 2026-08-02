import { NextResponse } from "next/server";

function getSupabaseConfig() {
  return {
    supabaseUrl: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";
  const { supabaseUrl, serviceRoleKey } = getSupabaseConfig();

  if (!query) {
    return NextResponse.json(
      { error: "กรุณากรอกเบอร์โทรหรือ LINE ID" },
      { status: 400 }
    );
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Missing Supabase config" },
      { status: 500 }
    );
  }

  const normalizedPhone = query.replace(/\D/g, "");
  const keyword = normalizedPhone || query;
  const encodedKeyword = encodeURIComponent(keyword);

  const response = await fetch(
    `${supabaseUrl}/rest/v1/bookings?or=(phone.eq.${encodedKeyword},line_id.eq.${encodedKeyword})&select=id,customer_name,phone,line_id,service,booking_date,booking_time,amount,status,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "ไม่สามารถตรวจสอบคิวได้" },
      { status: 500 }
    );
  }

  const bookings = await response.json();

  return NextResponse.json({ bookings });
}
