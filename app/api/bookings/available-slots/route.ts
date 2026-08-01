import { NextResponse } from "next/server";

const allSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00"
];

const blockingStatuses = ["รอชำระเงิน", "รอตรวจสลิป", "ยืนยันแล้ว"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing Supabase config" }, { status: 500 });
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/bookings?booking_date=eq.${date}&status=in.(${blockingStatuses.join(",")})&select=booking_time`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Could not load bookings" }, { status: 500 });
  }

  const bookings = (await response.json()) as { booking_time: string }[];
  const bookedSlots = bookings.map((booking) => booking.booking_time);
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return NextResponse.json({ availableSlots });
}
