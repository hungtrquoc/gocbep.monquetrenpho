import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng website Góc Bếp.",
};

export default function TermsPage() {
  const updated = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date("2026-08-27"));

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-bold text-coffee">Điều khoản sử dụng</h1>
      <p className="mt-2 text-sm text-coffee/60">Cập nhật lần cuối: {updated}</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-coffee/90">
        <p>
          Khi truy cập và sử dụng website Góc Bếp (sau đây gọi là
          &quot;website&quot;), anh/chị đồng ý với các điều khoản dưới đây.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            1. Nội dung website
          </h2>
          <p className="mt-2">
            Nội dung công thức nấu ăn trên website được biên soạn dựa trên các
            video đã đăng tải công khai trên kênh YouTube Góc Bếp, có sự hỗ trợ
            của công cụ trí tuệ nhân tạo (AI) trong việc soạn thảo, và được
            biên tập/duyệt lại trước khi đăng. Công thức chỉ mang tính chất
            tham khảo; kết quả nấu ăn thực tế có thể khác nhau tuỳ nguyên liệu,
            dụng cụ và khẩu vị mỗi người.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            2. Bản quyền
          </h2>
          <p className="mt-2">
            Toàn bộ video được nhúng trên website thuộc bản quyền của kênh
            YouTube Góc Bếp. Hình ảnh, bài viết công thức trên website không
            được sao chép, phân phối lại nhằm mục đích thương mại nếu chưa
            được sự đồng ý.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            3. Quảng cáo &amp; liên kết affiliate
          </h2>
          <p className="mt-2">
            Website có thể hiển thị quảng cáo (thông qua Google AdSense hoặc
            mạng quảng cáo khác) và các liên kết tiếp thị liên kết (affiliate)
            tới sản phẩm bán trên các sàn thương mại điện tử. Nếu anh/chị mua
            hàng qua các liên kết này, Góc Bếp có thể nhận được một khoản hoa
            hồng, không phát sinh thêm chi phí cho anh/chị. Việc gợi ý sản
            phẩm dựa trên kinh nghiệm sử dụng thực tế của kênh, không mang
            tính chất tư vấn chuyên môn.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            4. Giới hạn trách nhiệm
          </h2>
          <p className="mt-2">
            Góc Bếp không chịu trách nhiệm đối với các thiệt hại phát sinh từ
            việc áp dụng công thức hoặc sử dụng sản phẩm được gợi ý trên
            website, bao gồm nhưng không giới hạn ở vấn đề an toàn thực phẩm,
            dị ứng, hoặc chất lượng sản phẩm từ bên thứ ba.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">
            5. Thay đổi điều khoản
          </h2>
          <p className="mt-2">
            Điều khoản này có thể được cập nhật theo thời gian. Phiên bản mới
            nhất luôn được đăng tại trang này.
          </p>
        </section>

        <p className="text-sm text-coffee/60">
          Xem thêm{" "}
          <a href="/privacy" className="text-chili underline">
            Chính sách quyền riêng tư
          </a>
          .
        </p>
      </div>
    </div>
  );
}
