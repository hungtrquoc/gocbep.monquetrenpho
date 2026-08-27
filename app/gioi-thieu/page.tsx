import type { Metadata } from "next";
import Image from "next/image";
import { CHANNEL_URL } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Giới thiệu về kênh Góc Bếp – Món quê trên phố.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="mb-10 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Logo Góc Bếp"
          width={120}
          height={120}
          className="rounded-full shadow-md ring-4 ring-white"
        />
        <h1 className="mt-6 font-display text-3xl font-bold text-coffee">
          Về Góc Bếp
        </h1>
      </div>

      <div className="space-y-5 text-base leading-relaxed text-coffee/90">
        <p>
          <strong>Góc Bếp – Món quê trên phố</strong> là kênh YouTube chia sẻ những
          video nấu ăn xoay quanh các món ăn dân dã, mộc mạc mang hương vị quê nhà,
          được tái hiện lại ngay giữa nhịp sống hối hả của thành phố.
        </p>
        <p>
          Từ những nguyên liệu quen thuộc, dễ tìm ở bất kỳ khu chợ hay siêu thị
          nào, Góc Bếp mong muốn mang đến cho người xem những công thức nấu ăn đơn
          giản, dễ làm, nhưng vẫn giữ trọn hương vị thân thương như bữa cơm gia
          đình ngày xưa.
        </p>
        <p>
          Mỗi video trên kênh không chỉ là một công thức nấu ăn, mà còn là một câu
          chuyện nhỏ, một ký ức, một góc bếp ấm áp mà ai trong chúng ta cũng từng
          có. Hy vọng Góc Bếp sẽ là người bạn đồng hành cùng bạn trong gian bếp
          mỗi ngày.
        </p>
        <p>
          Theo dõi kênh để không bỏ lỡ những video nấu ăn mới nhất từ Góc Bếp:{" "}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-chili underline"
          >
            youtube.com/@GocBep
          </a>
        </p>
      </div>
    </div>
  );
}
