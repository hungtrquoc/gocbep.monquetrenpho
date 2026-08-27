# Website Góc Bếp

Website chính thức cho kênh YouTube **Góc Bếp – Món quê trên phố**, xây bằng
Next.js (App Router) để deploy lên Vercel.

## Tính năng đã có (v1)

- Trang chủ: giới thiệu ngắn về kênh + 6 video mới nhất.
- Trang **Video** (`/videos`): tự động lấy toàn bộ video mới nhất từ kênh
  YouTube (tối đa 15 video — giới hạn của RSS feed công khai của YouTube),
  KHÔNG cần API key, tự làm mới mỗi giờ.
- Trang **Giới thiệu** (`/gioi-thieu`): giới thiệu về kênh.
- Trang **Chính sách quyền riêng tư** (`/privacy`): dùng để đáp ứng yêu cầu
  "Application privacy policy link" khi publish OAuth consent screen của dự
  án camera-recorder (xem phần "Dùng chung cho Google OAuth" bên dưới).
- Logo kênh đã được gắn làm favicon + logo trên site.

Chưa làm (để dành cho v2, theo đúng phạm vi đã chốt):
- Mục sản phẩm affiliate.

## Cách video được lấy tự động

Kênh YouTube có 1 RSS feed công khai, không cần API key:

```
https://www.youtube.com/feeds/videos.xml?channel_id=UCv8-WFJj50Wy_50ddQS9Y9A
```

File `lib/youtube.ts` fetch link này ở phía server (Next.js server component),
parse XML bằng `fast-xml-parser`, và cache lại 1 giờ (`revalidate: 3600`) —
nghĩa là mỗi khi anh đăng video mới lên YouTube, tối đa 1 giờ sau website sẽ
tự hiển thị video đó, không cần sửa code hay deploy lại.

Lưu ý: RSS feed công khai của YouTube chỉ trả về tối đa ~15 video gần nhất
(giới hạn từ phía YouTube, không phải do code). Nếu sau này cần xem đầy đủ
lịch sử video hoặc cần thêm thông tin (lượt xem, thời lượng...), sẽ cần
chuyển sang YouTube Data API v3 (cần API key + có quota).

Nếu muốn đổi sang kênh khác, chỉ cần sửa `CHANNEL_ID` trong
`lib/youtube.ts`.

## Chạy thử ở máy local

Cần cài Node.js 18 trở lên.

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Deploy lên Vercel

### Cách 1 — Qua GitHub (khuyên dùng)

1. Tạo 1 repo mới trên GitHub (có thể để Private), ví dụ `gocbep-website`.
2. Đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "Website Góc Bếp v1"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-anh>/gocbep-website.git
   git push -u origin main
   ```
3. Vào https://vercel.com/ , đăng nhập bằng tài khoản GitHub.
4. Bấm **"Add New..." → "Project"**, chọn repo `gocbep-website` vừa tạo.
5. Vercel tự nhận diện đây là project Next.js, cứ để mặc định các thông số
   build (Build Command: `next build`, Output: mặc định) rồi bấm **Deploy**.
6. Sau ~1-2 phút, Vercel cấp cho 1 domain dạng
   `gocbep-website-xxxx.vercel.app` (hoặc tên project anh đặt) — đây chính là
   domain có thể dùng cho các bước ở dưới.

Mỗi lần anh `git push` code mới lên nhánh `main`, Vercel sẽ tự động build và
deploy lại — không cần thao tác thủ công.

### Cách 2 — Qua Vercel CLI (nhanh, không cần GitHub)

```bash
npm install -g vercel
cd gocbep-website
vercel login
vercel        # deploy bản preview
vercel --prod # deploy bản chính thức (production)
```

## Đổi tên miền (domain) sau khi deploy

Mặc định Vercel cấp domain dạng `<ten-project>.vercel.app`. Nếu sau này mua
domain riêng (vd `gocbep.com`), vào project trên Vercel → tab **Settings →
Domains** → thêm domain, làm theo hướng dẫn trỏ DNS.

## Dùng chung cho Google OAuth (dự án camera-recorder)

Trang `/privacy` và trang chủ của website này được thiết kế để có thể dùng
làm:
- **Application home page**: link trang chủ, vd `https://gocbep-website-xxxx.vercel.app`
- **Application privacy policy link**: `https://gocbep-website-xxxx.vercel.app/privacy`
- **Authorized domain**: domain Vercel cấp, ví dụ `vercel.app`-subdomain của
  project này (nhập đúng phần domain, KHÔNG có `https://` và KHÔNG có dấu
  `/` ở cuối) — cần verify domain đó trong Google Search Console trước khi
  Google Cloud Console chấp nhận.

Việc này giúp publish OAuth consent screen của dự án camera-recorder sang
trạng thái "In Production", tránh phải re-authorize token mỗi 7 ngày.

## Cấu trúc thư mục

```
app/
  layout.tsx          # layout chung (header, footer, metadata)
  page.tsx            # trang chủ
  videos/page.tsx      # trang danh sách toàn bộ video
  gioi-thieu/page.tsx  # trang giới thiệu kênh
  privacy/page.tsx     # chính sách quyền riêng tư
  globals.css          # style toàn cục (Tailwind)
components/
  Header.tsx
  Footer.tsx
  VideoCard.tsx
lib/
  youtube.ts           # fetch + parse RSS feed YouTube
public/
  logo.png             # logo kênh Góc Bếp
```
