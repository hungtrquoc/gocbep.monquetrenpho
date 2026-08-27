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
  }).format(new Date("2026-08-27"));

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
            3. Cookie &amp; quảng cáo (Google AdSense)
          </h2>
          <p className="mt-2">
            Website có thể hiển thị quảng cáo thông qua Google AdSense. Google
            và các đối tác quảng cáo có thể sử dụng cookie để hiển thị quảng
            cáo dựa trên lượt truy cập của bạn vào website này và các website
            khác. Bạn có thể tìm hiểu thêm hoặc tuỳ chỉnh quảng cáo cá nhân hoá
            tại{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chili underline"
            >
              Cài đặt quảng cáo của Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            4. Liên kết affiliate
          </h2>
          <p className="mt-2">
            Một số trang trên website (ví dụ trang &quot;Sản phẩm&quot;) chứa
            liên kết tiếp thị liên kết (affiliate) tới các sàn thương mại điện
            tử. Nếu bạn mua hàng qua các liên kết này, Góc Bếp có thể nhận được
            một khoản hoa hồng nhỏ, không phát sinh thêm chi phí cho bạn. Việc
            này không ảnh hưởng đến nội dung công thức hay đánh giá sản phẩm
            trên website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            5. Liên kết đến trang khác
          </h2>
          <p className="mt-2">
            Website có thể chứa liên kết đến các trang bên ngoài (YouTube, sàn
            thương mại điện tử, mạng xã hội...). Chúng tôi không chịu trách
            nhiệm về nội dung hay chính sách quyền riêng tư của các trang bên
            ngoài này.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            6. Thay đổi chính sách
          </h2>
          <p className="mt-2">
            Chính sách này có thể được cập nhật theo thời gian khi website bổ
            sung tính năng mới. Mọi thay đổi sẽ được đăng tải trên trang này.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            7. Liên hệ
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
