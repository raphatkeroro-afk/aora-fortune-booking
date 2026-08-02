export default function PaymentPage() {
  return (
    <main style={{ minHeight: "100vh", padding: 24, fontFamily: "sans-serif", background: "#f8f1e7" }}>
      <section style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#392446", color: "white", fontWeight: 700 }}>
          วิธีชำระเงิน
        </p>

        <h1 style={{ fontSize: "clamp(34px, 8vw, 46px)", lineHeight: 1.05, marginTop: 24 }}>
          Aora Fortune Booking
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6b5d70" }}>
          หลังจากจองคิวแล้ว กรุณาชำระเงินตามยอดแพ็กเกจ และส่งสลิปให้แอดมินตรวจสอบ
        </p>

        <section style={{ marginTop: 28, background: "white", padding: 24, borderRadius: 16 }}>
          <h2>ช่องทางโอนเงิน</h2>

          <div style={{ marginTop: 16, padding: 18, borderRadius: 14, background: "#f8f1e7" }}>
            <p><strong>ธนาคาร:</strong> กรุงไทย</p>
            <p><strong>เลขบัญชี:</strong> 000-0-00000-0</p>
            <p><strong>ชื่อบัญชี:</strong> Aora Fortune Booking</p>
          </div>

          <div style={{ marginTop: 20 }}>
            <h2>ขั้นตอนหลังชำระเงิน</h2>
            <p>1. โอนเงินตามยอดบริการที่เลือก</p>
            <p>2. แคปหน้าจอสลิปโอนเงิน</p>
            <p>3. ส่งสลิปให้แอดมินใน LINE OA</p>
            <p>4. รอแอดมินตรวจสอบและเปลี่ยนสถานะเป็น “ยืนยันแล้ว”</p>
          </div>

          <div style={{ marginTop: 20, padding: 18, borderRadius: 14, background: "#fff7e6" }}>
            <strong>หมายเหตุ</strong>
            <p style={{ marginBottom: 0 }}>
              กรุณาชำระภายในเวลาที่กำหนด หากไม่ชำระเงิน คิวอาจถูกยกเลิกเพื่อเปิดให้ลูกค้าท่านอื่นจอง
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
