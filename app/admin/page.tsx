"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  line_id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  note?: string;
  amount: number;
  status: string;
  created_at: string;
};

const statuses = ["รอชำระเงิน", "รอตรวจสลิป", "ยืนยันแล้ว", "ยกเลิก"];

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);

    const response = await fetch("/api/bookings");
    const data = await response.json();

    setBookings(data.bookings || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/bookings/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status })
    });

    await loadBookings();
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <main style={{ minHeight: "100vh", padding: 32, fontFamily: "sans-serif", background: "#f8f1e7" }}>
      <section style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#392446", color: "white", fontWeight: 700 }}>
          Admin Dashboard
        </p>

        <h1 style={{ fontSize: 44, marginTop: 20 }}>Aora Fortune Booking</h1>
        <p style={{ fontSize: 18, color: "#6b5d70" }}>
          จัดการรายการจองและเปลี่ยนสถานะ
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, gap: 12 }}>
          <h2 style={{ margin: 0 }}>รายการจองทั้งหมด: {bookings.length} รายการ</h2>
          <button
            onClick={loadBookings}
            style={{ padding: "10px 14px", borderRadius: 10, border: "0", background: "#392446", color: "white", fontWeight: 700, cursor: "pointer" }}
          >
            รีเฟรช
          </button>
        </div>

        <div style={{ marginTop: 16, background: "white", borderRadius: 16, padding: 24, overflowX: "auto" }}>
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1050 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
                  <th style={{ padding: 12 }}>ลูกค้า</th>
                  <th style={{ padding: 12 }}>เบอร์</th>
                  <th style={{ padding: 12 }}>LINE ID</th>
                  <th style={{ padding: 12 }}>บริการ</th>
                  <th style={{ padding: 12 }}>วันเวลา</th>
                  <th style={{ padding: 12 }}>ยอด</th>
                  <th style={{ padding: 12 }}>สถานะ</th>
                  <th style={{ padding: 12 }}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 12, fontWeight: 700 }}>{booking.customer_name}</td>
                    <td style={{ padding: 12 }}>{booking.phone}</td>
                    <td style={{ padding: 12 }}>{booking.line_id}</td>
                    <td style={{ padding: 12 }}>{booking.service}</td>
                    <td style={{ padding: 12 }}>{booking.booking_date} {booking.booking_time}</td>
                    <td style={{ padding: 12 }}>{booking.amount} บาท</td>
                    <td style={{ padding: 12 }}>
                      <span style={{ padding: "6px 10px", borderRadius: 999, background: "#f3eadc", fontWeight: 700 }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <select
                        value={booking.status}
                        onChange={(event) => updateStatus(booking.id, event.target.value)}
                        style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd", minWidth: 140 }}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && bookings.length === 0 && (
            <p style={{ color: "#6b5d70" }}>ยังไม่มีรายการจอง</p>
          )}
        </div>
      </section>
    </main>
  );
}
