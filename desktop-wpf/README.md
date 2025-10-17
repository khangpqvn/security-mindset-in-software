## Desktop WPF (C# .NET)

### Yêu cầu
- .NET Framework 4.6.2 Developer Pack (MSBuild) hoặc Visual Studio với targeting pack 4.6.2
- Backend chạy tại `http://localhost:3000` hoặc đặt biến môi trường `BACKEND_URL`

### Cài đặt & chạy

```powershell
cd desktop-wpf
# Khôi phục NuGet packages (packages.config)
nuget restore
$env:BACKEND_URL = 'http://localhost:3000'
msbuild SecurityMindsetWpf.csproj /p:Configuration=Debug
./bin/Debug/SecurityMindset.Wpf.exe
```

### Publish (.exe)

```powershell
cd desktop-wpf
nuget restore
$env:BACKEND_URL = 'http://localhost:3000'
msbuild SecurityMindsetWpf.csproj /p:Configuration=Release
```

- Output: `desktop-wpf/bin/Release/`
- Đổi icon: cấu hình `ApplicationIcon` trong `SecurityMindsetWpf.csproj`

### Cấu trúc
- `MainWindow`: Login, gọi `POST /api/auth/login`
- `DashboardWindow`: Màn hình sau đăng nhập, hiển thị URL backend


