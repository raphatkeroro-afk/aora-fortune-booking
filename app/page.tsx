export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: 24, fontFamily: "sans-serif", background: "#f8f1e7" }}>
      <section style={{ maxWidth: 960, margin: "0 auto" }}>
        <p style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#392446", color: "white", fontWeight: 700 }}>
          Phase 1 Demo · LINE OA Booking
        </p>

        <h1 style={{ fontSize: 56, lineHeight: 1, marginTop: 24 }}>
          Aora Fortune Booking
        </h1>

        <p style={{ fontSize: 20, lineHeight: 1.7, color: "#6b5d70" }}>
          ระบบจองคิวดูดวงออนไลน์สำหรับเปิดจาก Rich Menu ใน LINE OA
          ลูกค้าเลือกบริการ วัน เวลา กรอกข้อมูล และจำลองสถานะการจองได้
        </p>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 32 }}>
          {["ดูดวงความรัก", "ดูดวงการงาน", "แพ็กเกจเปิดดวง"].map((name) => (
            <div key={name} style={{ background: "white", padding: 20, borderRadius: 16 }}>
              <h2>{name}</h2>
              <p>เริ่มต้น 599 บาท · จองผ่าน LINE OA</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: "white", padding: 20, borderRadius: 16 }}>
          <h2>ตัวอย่างฟอร์มจองคิว</h2>
          <p>เลือกบริการ → เลือกวัน → เลือกเวลา → กรอกข้อมูลลูกค้า → จำลองชำระเงิน</p>
          <button style={{ padding: "14px 18px", borderRadius: 12, border: 0, background: "#392446", color: "white", fontWeight: 800 }}>
            สร้างรายการจอง
          </button>
        </div>
      </section>
    </main>
  );
}
