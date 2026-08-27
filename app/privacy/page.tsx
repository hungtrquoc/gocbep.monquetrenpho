import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư",
  description: "Chính sách quyền riêng tư của website Góc Bếp.",
};

export default function PrivacyPage() {
  const updated = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date("2026-08-26"));

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-bold text-coffee">
        Chính sách quyền riêng tư
      </h1>
      <p className="mt-2 text-sm text-coffee/60">Cập nhật lần cuối: {updated}</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-coffee/90">
        <p>
          Website Góc Bếp (sau đây gọi là &quot;website&quot;) là trang giới thiệu
          và chia sẻ nội dung video công khai từ kênh YouTube Góc Bếp. Chúng tôi
          tôn trọng quyền riêng tư của người truy cập và cam kết minh bạch về cách
          website hoạt động.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            1. Thông tin chúng tôi thu thập
          </h2>
          <p className="mt-2">
            Website này KHÔNG yêu cầu đăng ký tài khoản, KHÔNG thu thập thông tin
            cá nhân (họ tên, email, số điện thoại...) của người truy cập. Website
            chỉ hiển thị công khai danh sách video được lấy tự động từ nguồn cấp
            dữ liệu (RSS feed) công khai của kênh YouTube Góc Bếp.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            2. Dữ liệu từ bên thứ ba (YouTube)
          </h2>
          <p className="mt-2">
            Khi bạn bấm vào một video để xem, bạn sẽ được chuyển đến trang
            YouTube (youtube.com). Việc xem video trên YouTube sẽ tuân theo{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chili underline"
            >
              Chính sách quyền riêng tư của Google
            </a>
            . Website Góc Bếp không kiểm soát và không chịu trách nhiệm về cách
            YouTube/Google xử lý dữ liệu của bạn trên nền tảng của họ.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            3. Cookie
          </h2>
          <p className="mt-2">
            Bản thân website Góc Bếp không sử dụng cookie để theo dõi người dùng.
            Nếu trong tương lai website tích hợp thêm công cụ phân tích lượt truy
            cập hoặc liên kết affiliate, chính sách này sẽ được cập nhật tương
            ứng.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            4. Liên kết đến trang khác
          </h2>
          <p className="mt-2">
            Website có thể chứa liên kết đến các trang bên ngoài (YouTube, mạng xã
            hội...). Chúng tôi không chịu trách nhiệm về nội dung hay chính sách
            quyền riêng tư của các trang bên ngoài này.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            5. Thay đổi chính sách
          </h2>
          <p className="mt-2">
            Chính sách này có thể được cập nhật theo thời gian khi website bổ
            sung tính năng mới. Mọi thay đổi sẽ được đăng tải trên trang này.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            6. Liên hệ
          </h2>
          <p className="mt-2">
            Nếu có bất kỳ câu hỏi nào về chính sách quyền riêng tư này, vui lòng
            liên hệ qua kênh YouTube Góc Bếp.
          </p>
        </section>
      </div>
    </div>
  );
}
