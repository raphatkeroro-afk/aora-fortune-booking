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

  const booking = {
    id: crypto.randomUUID(),
    ...payload,
    status: "รอชำระเงิน",
    created_at: new Date().toISOString()
  };

  return NextResponse.json({
    booking,
    demoMode: true
  });
}
