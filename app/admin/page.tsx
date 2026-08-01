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

async function getBookings() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return [];
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

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as Booking[];
}

export default async function AdminPage() {
  const bookings = await getBookings();

  return (
    <main style={{ minHeight: "100vh", padding: 32, fontFamily: "sans-serif", background: "#f8f1e7" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#392446", color: "white", fontWeight: 700 }}>
          Admin Dashboard
        </p>

        <h1 style={{ fontSize: 44, marginTop: 20 }}>Aora Fortune Booking</h1>
        <p style={{ fontSize: 18, color: "#6b5d70" }}>
          รายการจองคิวจาก Supabase
        </p>

        <div style={{ marginTop: 28, background: "white", borderRadius: 16, padding: 24, overflowX: "auto" }}>
          <h2 style={{ marginTop: 0 }}>รายการจองทั้งหมด: {bookings.length} รายการ</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
                <th style={{ padding: 12 }}>ลูกค้า</th>
                <th style={{ padding: 12 }}>เบอร์</th>
                <th style={{ padding: 12 }}>LINE ID</th>
                <th style={{ padding: 12 }}>บริการ</th>
                <th style={{ padding: 12 }}>วันเวลา</th>
                <th style={{ padding: 12 }}>ยอด</th>
                <th style={{ padding: 12 }}>สถานะ</th>
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
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <p style={{ color: "#6b5d70" }}>ยังไม่มีรายการจอง</p>
          )}
        </div>
      </section>
    </main>
  );
}
