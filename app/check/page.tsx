"use client";

import { FormEvent, useState } from "react";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  line_id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function CheckBookingPage() {
  const [query, setQuery] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function checkBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setBookings([]);

    try {
      const response = await fetch(`/api/bookings/check?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "ไม่สามารถตรวจสอบคิวได้");
        return;
      }

      setBookings(data.bookings || []);

      if (!data.bookings || data.bookings.length === 0) {
        setMessage("ไม่พบรายการจองจากข้อมูลนี้");
      }
    } catch {
      setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, fontFamily: "sans-serif", background: "#f8f1e7" }}>
      <section style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#392446", color: "white", fontWeight: 700 }}>
          ตรวจสอบคิว
        </p>

        <h1 style={{ fontSize: "clamp(34px, 8vw, 46px)", lineHeight: 1.05, marginTop: 24 }}>
          Aora Fortune Booking
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6b5d70" }}>
          กรอกเบอร์โทรหรือ LINE ID ที่ใช้จอง เพื่อดูสถานะคิวของคุณ
        </p>

        <form onSubmit={checkBooking} style={{ marginTop: 28, background: "white", padding: 24, borderRadius: 16 }}>
          <label style={{ display: "grid", gap: 8 }}>
            เบอร์โทร หรือ LINE ID
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value.trim())}
              placeholder="เช่น 0987654331 หรือ rapjj"
              required
              style={{ padding: 12 }}
            />
          </label>

          <button
            disabled={isLoading}
            type="submit"
            style={{ marginTop: 16, padding: 14, borderRadius: 12, border: 0, background: "#392446", color: "white", fontWeight: 700 }}
          >
            {isLoading ? "กำลังตรวจสอบ..." : "ตรวจสอบคิว"}
          </button>

          {message && <p style={{ marginTop: 14, fontWeight: 700 }}>{message}</p>}
        </form>

        <section style={{ display: "grid", gap: 14, marginTop: 24 }}>
          {bookings.map((booking) => (
            <article key={booking.id} style={{ background: "white", padding: 20, borderRadius: 16 }}>
              <strong style={{ display: "block", fontSize: 18, wordBreak: "break-word" }}>
  {booking.customer_name}
</strong>
              <p>{booking.service}</p>
              <p>{booking.booking_date} เวลา {booking.booking_time}</p>
              <p>ยอดชำระ {booking.amount.toLocaleString("th-TH")} บาท</p>
              <p><strong>สถานะ: {booking.status}</strong></p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
