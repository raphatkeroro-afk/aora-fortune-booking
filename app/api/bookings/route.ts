import { NextResponse } from "next/server";

type BookingPayload = {
  customer_name: string;
  phone: string;
  line_id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  note?: string;
  amount: number;
};

function getSupabaseConfig() {
  return {
    supabaseUrl: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

export async function GET() {
  const { supabaseUrl, serviceRoleKey } = getSupabaseConfig();

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Missing Supabase config" }, { status: 500 });
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/bookings?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      },
      cache: "no-store"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as BookingPayload;
  const { supabaseUrl, serviceRoleKey } = getSupabaseConfig();

  if (!payload.customer_name || !payload.phone || !payload.line_id) {
    return NextResponse.json({ error: "กรุณากรอกชื่อ เบอร์โทร และ LINE ID" }, { status: 400 });
  }

  if (!payload.service || !payload.booking_date || !payload.booking_time) {
    return NextResponse.json({ error: "กรุณาเลือกบริการ วัน และเวลา" }, { status: 400 });
  }

  if (!supabaseUrl || !serviceRoleKey) {
  return NextResponse.json({ error: "Missing Supabase config" }, { status: 500 });
}

const blockingStatuses = ["รอชำระเงิน", "รอตรวจสลิป", "ยืนยันแล้ว"];

const duplicateCheck = await fetch(
  `${supabaseUrl}/rest/v1/bookings?booking_date=eq.${payload.booking_date}&booking_time=eq.${payload.booking_time}&status=in.(${blockingStatuses.join(",")})&select=id`,
  {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    },
    cache: "no-store"
  }
);

if (!duplicateCheck.ok) {
  return NextResponse.json(
    { error: "ไม่สามารถตรวจสอบคิวซ้ำได้" },
    { status: 500 }
  );
}

const duplicateBookings = (await duplicateCheck.json()) as { id: string }[];

if (duplicateBookings.length > 0) {
  return NextResponse.json(
    { error: "เวลานี้ถูกจองแล้ว กรุณาเลือกเวลาอื่น" },
    { status: 409 }
  );
}

const response = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      ...payload,
      note: payload.note || "",
      status: "รอชำระเงิน"
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data[0], demoMode: false });
}
