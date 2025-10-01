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
```

### Cơ sở dữ liệu tối thiểu

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
INSERT INTO users (username, password,email)
VALUES ('admin', 'admin123',"khangpq.vn@gmail.com");
```

Lưu ý: Thay hash theo môi trường của bạn nếu cần.

### API

- `POST /api/auth/login`
  - Body JSON: `{ "username": string, "password": string }`
  - Response: `true` nếu xác thực thành công, ngược lại `false`.

- `POST /api/auth/forgot`
  - Body JSON: `{ "email": string }`
  - Response: `{ status: boolean }` — nếu tìm thấy email và gửi mail thành công sẽ trả `true`.
  - Demo này cập nhật cột `password` trực tiếp để phù hợp với logic đăng nhập hiện tại. Trong môi trường thật, nên dùng token đặt lại mật khẩu và hash mật khẩu.

### Static `public`

Thư mục `public/` được phục vụ tĩnh. Truy cập `http://localhost:3000/` để mở trang demo login.

### Quên mật khẩu

- Trang `public/forgot.html` cho phép người dùng nhập email để đặt lại mật khẩu.
- Khi gửi thành công, mật khẩu mới sẽ được gửi tới email nếu email khớp với tài khoản.


