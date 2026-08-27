# Website Góc Bếp

Website chính thức cho kênh YouTube **Góc Bếp – Món quê trên phố**, xây bằng
Next.js (App Router), deploy trên Vercel.

Repo: https://github.com/hungtrquoc/gocbep.monquetrenpho

## Tính năng đã có

- **Trang chủ**: giới thiệu ngắn về kênh + 6 video mới nhất.
- **Video** (`/videos`): tự động lấy danh sách video mới nhất từ kênh YouTube.
- **Công thức** (`/cong-thuc`, `/cong-thuc/<slug>`): bài viết chi tiết công
  thức cho từng video (nguyên liệu, các bước, mẹo nhỏ, nhúng video) — xem mục
  "Quy trình thêm 1 bài công thức mới" bên dưới.
- **Sản phẩm** (`/san-pham`): trang gợi ý sản phẩm affiliate (dụng cụ bếp,
  nguyên liệu...).
- **Giới thiệu** (`/gioi-thieu`), **Chính sách quyền riêng tư** (`/privacy`),
  **Điều khoản sử dụng** (`/dieu-khoan`).
- **Quảng cáo Google AdSense**: đã dựng sẵn vị trí đặt quảng cáo ở các trang,
  chỉ cần điền mã publisher là chạy — xem mục "Bật quảng cáo (AdSense)".
- Logo kênh đã gắn làm favicon + logo trên site.

## Cách video được lấy tự động

`lib/youtube.ts` lấy danh sách video theo 2 cách:

1. **YouTube Data API v3** (ưu tiên, khuyên dùng) — cần biến môi trường
   `YOUTUBE_API_KEY`. Ổn định hơn nhiều so với RSS khi chạy trên hạ tầng
   cloud như Vercel (RSS từng bị lỗi không tải được video khi deploy — đã xử
   lý bằng cách chuyển qua API), lấy được tối đa 50 video/lần cùng đầy đủ mô
   tả, giúp AI viết bài công thức chính xác hơn.
2. **RSS feed công khai** (dự phòng) — tự động dùng nếu chưa cấu hình
   `YOUTUBE_API_KEY`, hoặc gọi API bị lỗi. Không cần key nhưng chỉ có tối đa
   ~15 video gần nhất và có thể không ổn định.

Cache lại 1 giờ (`revalidate: 3600`) — video mới đăng trên YouTube sẽ tự xuất
hiện trên web tối đa sau 1 giờ, không cần deploy lại.

### Cách lấy `YOUTUBE_API_KEY` (miễn phí)

1. Vào https://console.cloud.google.com/ , chọn project sẵn có (hoặc tạo mới,
   tương tự cách anh đã làm với project camera-recorder).
2. Vào **APIs & Services → Library**, tìm **"YouTube Data API v3"**, bấm
   **Enable**.
3. Vào **APIs & Services → Credentials → Create Credentials → API key**.
4. (Khuyên dùng) Bấm vào API key vừa tạo → mục **"API restrictions"** → chọn
   **"Restrict key"** → tick **YouTube Data API v3** — để key chỉ dùng được
   cho việc lấy video, an toàn hơn nếu lỡ lộ ra ngoài.
5. Copy API key, vào Vercel → project này → **Settings → Environment
   Variables** → thêm biến `YOUTUBE_API_KEY` = giá trị vừa copy → **Save** →
   vào tab **Deployments**, bấm **Redeploy** ở bản mới nhất để áp dụng.

Miễn phí trong hạn mức 10.000 unit/ngày — website này chỉ dùng vài chục
unit/ngày (do đã cache 1 giờ/lần), dùng thoải mái không lo vượt quota.

Nếu muốn đổi sang kênh khác, sửa `CHANNEL_ID` trong `lib/youtube.ts`.

## Quy trình thêm 1 bài công thức mới (mỗi video 1 trang chi tiết)

Nội dung công thức được lưu trong file `lib/recipes.ts` (không cần CMS/database
riêng, sửa trực tiếp file này là đủ):

1. Có video mới → nhờ Claude (trong 1 phiên làm việc) soạn bản nháp công thức
   dựa trên tiêu đề/mô tả video đó, thêm vào mảng `recipes` trong
   `lib/recipes.ts` với `published: false`.
2. Bài nháp xem được ngay qua link `/cong-thuc/<slug>` (có gắn nhãn "Bản nháp
   — chưa công khai" ở đầu trang) để anh duyệt nội dung, KHÔNG hiện ở trang
   danh sách `/cong-thuc` hay trang chủ.
3. Anh xem/chỉnh sửa nội dung trực tiếp trong file (hoặc nhờ Claude chỉnh),
   ưng ý thì đổi `published: true`.
4. Commit + push lên GitHub → Vercel tự deploy lại → bài chính thức lên trang
   danh sách công khai.

Có sẵn 1 bài mẫu (`vi-du-cong-thuc-mau`, đang để `published: false`) để xem
thử giao diện trang chi tiết trông ra sao — không phải nội dung thật.

## Bật quảng cáo (AdSense)

Ad slot (`components/AdSlot.tsx`) đã được đặt sẵn ở trang chủ, trang Video,
trang Công thức (danh sách + chi tiết), trang Sản phẩm — nhưng sẽ KHÔNG hiển
thị gì cho tới khi anh cấu hình biến môi trường:

```
NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
```

Các bước:
1. Đăng ký tài khoản tại https://www.google.com/adsense/ (dùng chính website
   này để đăng ký — cần có nội dung thật trước, ví dụ đã publish vài bài công
   thức).
2. Sau khi được Google duyệt, lấy mã **Publisher ID** (dạng `ca-pub-...`) ở
   mục **Account → Account information**.
3. Vào Vercel → project → **Settings → Environment Variables** → thêm
   `NEXT_PUBLIC_ADSENSE_CLIENT` = mã publisher đó → **Save** → **Redeploy**.

Lưu ý: AdSense thường yêu cầu website có sẵn Chính sách quyền riêng tư (đã có
ở `/privacy`) và Điều khoản sử dụng (đã có ở `/dieu-khoan`), cùng một lượng
nội dung thật tối thiểu — nên publish vài bài công thức thật trước khi đăng
ký.

## Thêm sản phẩm affiliate

Sửa trực tiếp mảng `products` trong `lib/products.ts` — mỗi sản phẩm gồm tên,
ảnh, mô tả ngắn, và link affiliate thật (Shopee Affiliate, Accesstrade,
Involve Asia, TikTok Shop...). Ảnh có thể để trong `public/products/` rồi
dùng đường dẫn `/products/ten-anh.jpg` (cách này luôn chạy được ngay,
khuyên dùng), hoặc dùng thẳng link ảnh sản phẩm từ sàn TMĐT — nếu dùng link
ảnh ngoài, cần thêm domain đó vào `images.remotePatterns` trong
`next.config.mjs` (giống như đã làm sẵn cho `i.ytimg.com`), nếu không
Next.js sẽ chặn không hiển thị ảnh.

## Chạy thử ở máy local

Cần cài Node.js 18 trở lên.

```bash
npm install
npm run dev
```

Mở http://localhost:3000. Nếu muốn thử với dữ liệu video thật khi chạy local,
tạo file `.env.local` ở gốc project với nội dung:

```
YOUTUBE_API_KEY=xxxxxxxxxxxxxxxxxxxx
```

(File `.env.local` đã được `.gitignore` loại trừ, không bao giờ bị đẩy lên
GitHub.)

## Deploy lên Vercel

Project đã được kết nối GitHub ↔ Vercel — mỗi lần push code mới lên nhánh
`main`, Vercel tự động build và deploy lại:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

Sau khi thêm/sửa biến môi trường (`YOUTUBE_API_KEY`,
`NEXT_PUBLIC_ADSENSE_CLIENT`...) trên Vercel, nhớ vào tab **Deployments** bấm
**Redeploy** ở bản mới nhất — biến môi trường chỉ áp dụng cho lần deploy sau
khi lưu, không tự áp dụng ngược cho bản đã deploy trước đó.

## Đổi tên miền (domain)

Mặc định Vercel cấp domain dạng `<ten-project>.vercel.app`. Nếu sau này mua
domain riêng (vd `gocbep.com`), vào project trên Vercel → tab **Settings →
Domains** → thêm domain, làm theo hướng dẫn trỏ DNS.

## Dùng chung cho Google OAuth (dự án camera-recorder)

Trang `/privacy` và trang chủ của website này có thể dùng làm:
- **Application home page**: link trang chủ, vd `https://<ten-project>.vercel.app`
- **Application privacy policy link**: `https://<ten-project>.vercel.app/privacy`
- **Authorized domain**: domain Vercel cấp cho project (nhập đúng phần
  domain, KHÔNG có `https://` và KHÔNG có dấu `/` ở cuối) — cần verify domain
  đó trong Google Search Console trước khi Google Cloud Console chấp nhận.

Việc này giúp publish OAuth consent screen của dự án camera-recorder sang
trạng thái "In Production", tránh phải re-authorize token mỗi 7 ngày.

## Cấu trúc thư mục

```
app/
  layout.tsx              # layout chung (header, footer, script AdSense, metadata)
  page.tsx                # trang chủ
  videos/page.tsx          # danh sách toàn bộ video
  cong-thuc/page.tsx       # danh sách công thức đã published
  cong-thuc/[slug]/page.tsx # trang chi tiết 1 công thức
  san-pham/page.tsx        # trang sản phẩm affiliate
  gioi-thieu/page.tsx      # giới thiệu kênh
  privacy/page.tsx         # chính sách quyền riêng tư
  dieu-khoan/page.tsx      # điều khoản sử dụng
  globals.css              # style toàn cục (Tailwind)
components/
  Header.tsx / Footer.tsx
  VideoCard.tsx / RecipeCard.tsx / ProductCard.tsx
  AdSlot.tsx               # 1 vị trí quảng cáo AdSense
lib/
  youtube.ts               # lấy video (Data API + fallback RSS)
  recipes.ts                # dữ liệu công thức ("CMS" dạng file)
  products.ts               # dữ liệu sản phẩm affiliate
public/
  logo.png                  # logo kênh Góc Bếp
```
