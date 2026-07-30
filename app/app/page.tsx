const services = [
  {
    name: "ดูดวงความรัก",
    price: "599 บาท",
    duration: "30 นาที",
    detail: "เหมาะสำหรับความสัมพันธ์ คนคุย คู่รัก และการเริ่มต้นใหม่",
  },
  {
    name: "ดูดวงการงาน",
    price: "699 บาท",
    duration: "45 นาที",
    detail: "ดูแนวโน้มงาน การเงิน โอกาสใหม่ และจังหวะตัดสินใจ",
  },
  {
    name: "แพ็กเกจเปิดดวง",
    price: "999 บาท",
    duration: "60 นาที",
    detail: "อ่านภาพรวมชีวิต พร้อมคำแนะนำเรื่องงาน เงิน ความรัก",
  },
];

const bookings = [
  {
    name: "คุณแพร",
    service: "ดูดวงความรัก",
    date: "วันนี้",
    time: "19:30",
    status: "รอชำระเงิน",
  },
  {
    name: "คุณนัท",
    service: "ดูดวงการงาน",
    date: "พรุ่งนี้",
    time: "20:00",
    status: "รอตรวจสลิป",
  },
  {
    name: "คุณไหม",
    service: "แพ็กเกจเปิดดวง",
    date: "เสาร์นี้",
    time: "21:00",
    status: "ยืนยันแล้ว",
  },
];

const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f1e7] text-[#2b2032]">
      <section className="mx-auto grid min-h-screen max-w-6xl gap-8 px-5 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-[#392446] px-4 py-2 text-sm font-bold text-white">
            Phase 1 Demo · LINE OA Booking
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Aora Fortune Booking
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6b5d70]">
            ระบบจองคิวดูดวงออนไลน์สำหรับเปิดจาก Rich Menu ใน LINE OA
            ลูกค้าเลือกบริการ วัน เวลา กรอกข้อมูล และจำลองสถานะการชำระเงินได้ในหน้าเดียว
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-[#7b6d7f]">คิววันนี้</p>
              <p className="mt-1 text-3xl font-black">18</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-[#7b6d7f]">เวลาว่าง</p>
              <p className="mt-1 text-3xl font-black">6</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-[#7b6d7f]">ยืนยันแล้ว</p>
              <p className="mt-1 text-3xl font-black">92%</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-xl">
          <div className="rounded-xl bg-[#392446] p-5 text-white">
            <p className="text-sm font-bold text-[#f2d38b]">ตัวอย่างฟอร์มจองคิว</p>
            <h2 className="mt-2 text-3xl font-black">จองคิวดูดวง</h2>
          </div>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 font-bold">
              เลือกบริการ
              <select className="rounded-lg border p-3">
                {services.map((service) => (
                  <option key={service.name}>
                    {service.name} · {service.price}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 font-bold">
              เลือกวัน
              <input className="rounded-lg border p-3" type="date" />
            </label>

            <div>
              <p className="mb-2 font-bold">เลือกเวลา</p>
              <div className="grid grid-cols-3 gap-2">
                {times.map((time) => (
                  <button
                    className="rounded-lg border bg-[#fffaf3] p-3 font-bold hover:bg-[#392446] hover:text-white"
                    key={time}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <label className="grid gap-2 font-bold">
              ชื่อลูกค้า
              <input className="rounded-lg border p-3" placeholder="เช่น คุณดาว" />
            </label>

            <label className="grid gap-2 font-bold">
              เบอร์โทร / LINE ID
              <input className="rounded-lg border p-3" placeholder="08x-xxx-xxxx" />
            </label>

            <button className="rounded-xl bg-[#392446] px-5 py-4 font-black text-white">
              สร้างรายการจอง
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-3xl font-black">แพ็กเกจดูดวง</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article className="rounded-xl bg-white p-5 shadow-sm" key={service.name}>
              <h3 className="text-xl font-black">{service.name}</h3>
              <p className="mt-2 text-[#6b5d70]">{service.detail}</p>
              <div className="mt-4 flex items-center justify-between font-bold">
                <span>{service.duration}</span>
                <span>{service.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-3xl font-black">รายการจองตัวอย่าง</h2>

        <div className="mt-5 overflow-hidden rounded-xl bg-white shadow-sm">
          {bookings.map((booking) => (
            <div
              className="grid gap-2 border-b p-4 last:border-b-0 md:grid-cols-4"
              key={`${booking.name}-${booking.time}`}
            >
              <p className="font-bold">{booking.name}</p>
              <p>{booking.service}</p>
              <p>
                {booking.date} · {booking.time}
              </p>
              <p className="font-black text-[#7a4f16]">{booking.status}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
