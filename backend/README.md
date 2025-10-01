## Backend (Express + MySQL)

### Cài đặt

1. Vào thư mục `backend` và tạo file `.env` theo mẫu bên dưới.
2. Cài dependencies và chạy dev:

```bash
npm install
npm run dev
```

Server chạy tại `http://localhost:3000`.

### Cấu hình môi trường (.env)

```ini
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=app

# SMTP để gửi email (quên mật khẩu)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASS=your_password
MAIL_FROM=no-reply@example.com

# Tài khoản admin mặc định khi khởi tạo DB tự động
DEFAULT_ADMIN_USER=admin
DEFAULT_ADMIN_PASS=admin123
DEFAULT_ADMIN_EMAIL=admin@example.com
```

### Khởi tạo cơ sở dữ liệu tự động

- Khi server khởi động, code sẽ tự:
  - Tạo database nếu chưa tồn tại (`DB_NAME`).
  - Tạo bảng `users` nếu chưa có.
  - Chèn một tài khoản admin mặc định nếu chưa tồn tại (cấu hình qua biến `DEFAULT_ADMIN_*` ở trên).

Bạn không nhất thiết phải chạy các lệnh SQL thủ công bên dưới, chỉ cần đảm bảo MySQL hoạt động và `.env` đúng.

### (Tùy chọn) Tạo thủ công

Tạo bảng `users`:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);
```

Chèn người dùng mẫu:

```sql
INSERT INTO users (username, password, email)
VALUES ('admin', 'admin123', 'user@example.com');
```

Lưu ý: Đây là demo dùng mật khẩu dạng plain để khớp logic đăng nhập hiện tại. Khi triển khai thực tế, hãy lưu mật khẩu dạng hash và dùng quy trình đặt lại bằng token/OTP an toàn.

### API

- `POST /api/auth/login`
  - Body JSON: `{ "username": string, "password": string }`
  - Response: `{ status: boolean }` — `true` nếu xác thực thành công, ngược lại `false`.

- `POST /api/auth/forgot`
  - Body JSON: `{ "email": string }`
  - Response: `{ status: boolean }` — nếu tìm thấy email và gửi mail thành công sẽ trả `true`.
  - Demo cập nhật cột `password` trực tiếp để phù hợp với logic đăng nhập hiện tại. Trong môi trường thật, nên dùng reset token và hash mật khẩu.

- `POST /api/auth/otp/request`
  - Body JSON: `{ "email": string }`
  - Response: `{ status: boolean }` — gửi OTP 6 số đến email, OTP hết hạn sau 10 phút.

- `POST /api/auth/otp/verify`
  - Body JSON: `{ "email": string, "otp": string, "newPassword": string }`
  - Response: `{ status: boolean }` — nếu OTP hợp lệ và chưa hết hạn sẽ đổi mật khẩu.

### Static `public`

Thư mục `public/` được phục vụ tĩnh. Các trang chính:
- `index.html`: form đăng nhập (có CAPTCHA). Khi đăng nhập thành công sẽ điều hướng về `home.html`.
- `home.html`: yêu cầu đã đăng nhập (dùng localStorage flag). Có bảng ảnh tải từ `https://jsonplaceholder.typicode.com/photos` với ô tìm kiếm.
- `forgot.html`: flow 1 — nhập email để đặt lại mật khẩu, hệ thống gửi mật khẩu mới qua email.
- `forgot-otp.html` và `reset-otp.html`: flow 2 — yêu cầu OTP và xác thực OTP để người dùng tự đặt mật khẩu mới.

### Quên mật khẩu

- Trang `public/forgot.html` cho phép người dùng nhập email để đặt lại mật khẩu.
- Khi gửi thành công, mật khẩu mới sẽ được gửi tới email nếu email khớp với tài khoản.


