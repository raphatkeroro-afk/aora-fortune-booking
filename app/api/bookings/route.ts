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

export async function POST(request: Request) {
  const payload = (await request.json()) as BookingPayload;

  if (!payload.customer_name || !payload.phone || !payload.line_id) {
    return NextResponse.json(
      { error: "กรุณากรอกชื่อ เบอร์โทร และ LINE ID" },
      { status: 400 }
    );
  }

  if (!payload.service || !payload.booking_date || !payload.booking_time) {
    return NextResponse.json(
      { error: "กรุณาเลือกบริการ วัน และเวลา" },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า Supabase Environment Variables" },
      { status: 500 }
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
      customer_name: payload.customer_name,
      phone: payload.phone,
      line_id: payload.line_id,
      service: payload.service,
      booking_date: payload.booking_date,
      booking_time: payload.booking_time,
      note: payload.note || "",
      amount: payload.amount,
      status: "รอชำระเงิน"
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.message || "บันทึกข้อมูลลง Supabase ไม่สำเร็จ" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    booking: data[0],
    demoMode: false
  });
}
