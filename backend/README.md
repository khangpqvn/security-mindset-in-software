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
```

### Cơ sở dữ liệu tối thiểu

Tạo bảng `users`:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

Chèn người dùng mẫu:

```sql
INSERT INTO users (username, password)
VALUES ('admin', 'admin123');
```

Lưu ý: Thay hash theo môi trường của bạn nếu cần.

### API

- `POST /api/auth/login`
  - Body JSON: `{ "username": string, "password": string }`
  - Response: `true` nếu xác thực thành công, ngược lại `false`.

### Static `public`

Thư mục `public/` được phục vụ tĩnh. Truy cập `http://localhost:3000/` để mở trang demo login.


