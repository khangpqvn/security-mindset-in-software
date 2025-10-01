## Desktop App (Electron)

### Yêu cầu
- Node.js 18+
- Backend đang chạy tại `http://localhost:3000` hoặc cấu hình biến môi trường `BACKEND_URL` khi chạy Electron

### Cài đặt & chạy

```bash
cd desktop
npm install
npm run dev
```

Mặc định app gọi backend ở `http://localhost:3000`. Để đổi:

```bash
BACKEND_URL=http://your-backend:3000 npm run dev
```

### Cấu trúc
- `main.js`: khởi tạo Electron, mở trang đăng nhập
- `preload.js`: expose biến môi trường `BACKEND_URL` cho renderer
- `renderer/login.html`: form đăng nhập, gọi `POST /api/auth/login`
- `renderer/dashboard.html`: trang sau đăng nhập (giao diện tĩnh, không có logic xử lý dữ liệu)


