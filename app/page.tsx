"use client";

import { FormEvent, useMemo, useState } from "react";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  line_id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  note: string;
  amount: number;
  status: string;
  created_at?: string;
};

const services = [
  { name: "ดูดวงความรัก", amount: 599, detail: "ความสัมพันธ์ คนคุย คู่รัก และจังหวะเริ่มต้นใหม่" },
  { name: "ดูดวงการงาน", amount: 699, detail: "งาน เงิน โอกาสใหม่ และการตัดสินใจสำคัญ" },
  { name: "แพ็กเกจเปิดดวง", amount: 999, detail: "อ่านภาพรวมชีวิต งาน เงิน ความรัก พร้อมคำแนะนำ" }
];

const slots = [
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

const starterBookings: Booking[] = [
  {
    id: "demo-1",
    customer_name: "คุณแพร",
    phone: "08x-xxx-1122",
    line_id: "prae_aora",
    service: "ดูดวงความรัก",
    booking_date: "2026-08-01",
    booking_time: "19:30",
    note: "อยากดูเรื่องความสัมพันธ์",
    amount: 599,
    status: "รอชำระเงิน"
  },
  {
    id: "demo-2",
    customer_name: "คุณนัท",
    phone: "08x-xxx-3344",
    line_id: "nutwork",
    service: "ดูดวงการงาน",
    booking_date: "2026-08-02",
    booking_time: "20:00",
    note: "กำลังตัดสินใจเรื่องงานใหม่",
    amount: 699,
    status: "ยืนยันแล้ว"
  }
];

export default function Home() {
  const [service, setService] = useState(services[0].name);
  const [bookingDate, setBookingDate] = useState("2026-08-01");
  const [bookingTime, setBookingTime] = useState(slots[3]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [note, setNote] = useState("");
  const [bookings, setBookings] = useState<Booking[]>(starterBookings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const selectedService = useMemo(
    () => services.find((item) => item.name === service) ?? services[0],
    [service]
  );

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          line_id: lineId,
          service,
          booking_date: bookingDate,
          booking_time: bookingTime,
          note,
          amount: selectedService.amount
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "ไม่สามารถสร้างรายการจองได้");
      }

      setBookings((current) => [result.booking, ...current]);
      setCustomerName("");
      setPhone("");
      setLineId("");
      setNote("");
      setMessage(
        result.demoMode
          ? "สร้างรายการจองแล้ว (โหมดเดโม ยังไม่บันทึกลงฐานข้อมูล)"
          : "สร้างรายการจองและบันทึกแล้ว"
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, fontFamily: "sans-serif", background: "#f8f1e7", color: "#2b2032" }}>
      <section style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#392446", color: "white", fontWeight: 700 }}>
          Phase 2 Demo · Booking API
        </p>

        <h1 style={{ fontSize: 56, lineHeight: 1, marginTop: 24 }}>
          Aora Fortune Booking
        </h1>

        <p style={{ fontSize: 20, lineHeight: 1.7, color: "#6b5d70" }}>
          ระบบจองคิวดูดวงออนไลน์สำหรับเปิดจาก Rich Menu ใน LINE OA
          ตอนนี้ฟอร์มสามารถกดสร้างรายการจองผ่าน API ได้แล้ว
        </p>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 32 }}>
          {services.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setService(item.name)}
              style={{
                textAlign: "left",
                background: item.name === service ? "#392446" : "white",
                color: item.name === service ? "white" : "#2b2032",
                padding: 20,
                borderRadius: 16,
                border: "0",
                cursor: "pointer"
              }}
            >
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
              <strong>{item.amount.toLocaleString("th-TH")} บาท</strong>
            </button>
          ))}
        </div>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginTop: 32 }}>
          <form onSubmit={submitBooking} style={{ background: "white", padding: 22, borderRadius: 16 }}>
            <h2>ฟอร์มจองคิว</h2>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              บริการ
              <select value={service} onChange={(event) => setService(event.target.value)} style={{ padding: 12 }}>
                {services.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} · {item.amount} บาท
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              วันที่
              <input value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} type="date" required style={{ padding: 12 }} />
            </label>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              เวลา
              <select value={bookingTime} onChange={(event) => setBookingTime(event.target.value)} style={{ padding: 12 }}>
                {slots.map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              ชื่อลูกค้า
              <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="เช่น คุณดาว" required style={{ padding: 12 }} />
            </label>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              เบอร์โทร
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="08x-xxx-xxxx" required style={{ padding: 12 }} />
            </label>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              LINE ID
              <input value={lineId} onChange={(event) => setLineId(event.target.value)} placeholder="LINE ID สำหรับติดต่อกลับ" required style={{ padding: 12 }} />
            </label>

            <label style={{ display: "grid", gap: 8, marginTop: 14 }}>
              รายละเอียดเพิ่มเติม
              <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="เช่น อยากดูเรื่องงานใน 3 เดือนข้างหน้า" style={{ padding: 12, minHeight: 90 }} />
            </label>

            <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "#f8f1e7" }}>
              <strong>ยอดชำระ: {selectedService.amount.toLocaleString("th-TH")} บาท</strong>
              <p style={{ margin: "6px 0 0" }}>สถานะเริ่มต้น: รอชำระเงิน</p>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              style={{ marginTop: 16, width: "100%", padding: 14, borderRadius: 12, border: 0, background: "#392446", color: "white", fontWeight: 800 }}
            >
              {isSubmitting ? "กำลังสร้างรายการ..." : "สร้างรายการจอง"}
            </button>

            {message && <p style={{ marginTop: 12, fontWeight: 700 }}>{message}</p>}
          </form>

          <aside style={{ background: "white", padding: 22, borderRadius: 16 }}>
  <h2>ข้อมูลการจองเป็นส่วนตัว</h2>

  <p style={{ lineHeight: 1.7, color: "#6b5d70" }}>
    ระบบจะแสดงเฉพาะฟอร์มจองสำหรับลูกค้า
    รายการจองทั้งหมดจะดูได้เฉพาะแอดมินเท่านั้น
  </p>

  <div style={{ marginTop: 18, padding: 16, borderRadius: 12, background: "#f8f1e7" }}>
    <strong>หลังจากจองสำเร็จ</strong>
    <p style={{ marginBottom: 0 }}>
      แอดมินจะตรวจสอบข้อมูลและอัปเดตสถานะผ่านหน้า Admin Dashboard
    </p>
  </div>
</aside>
    
</section>
</section>
</main>
);
}
