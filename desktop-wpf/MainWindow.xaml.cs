using System;
using System.Net.Http;
using System.Text;
using System.Windows;
using Newtonsoft.Json;

namespace SecurityMindset.Wpf
{
    public partial class MainWindow : Window
    {
        private static readonly HttpClient HttpClient = new HttpClient();
        private readonly string backendUrl;

        public MainWindow()
        {
            InitializeComponent();
            backendUrl = Environment.GetEnvironmentVariable("BACKEND_URL") ?? "http://localhost:3000";
        }

        private async void OnLoginClick(object sender, RoutedEventArgs e)
        {
            ResultText.Text = "";
            var username = UsernameBox.Text?.Trim() ?? string.Empty;
            var password = PasswordBox.Password ?? string.Empty;
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                ResultText.Text = "Vui lòng nhập đủ thông tin";
                return;
            }

            try
            {
                var payload = new { username = username, password = password };
                var json = JsonConvert.SerializeObject(payload);
                var request = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await HttpClient.PostAsync($"{backendUrl}/api/auth/login", request);
                var content = await response.Content.ReadAsStringAsync();
                dynamic outObj = JsonConvert.DeserializeObject(content);
                bool ok = (outObj != null && outObj.status == true);
                if (ok)
                {
                    ResultText.Text = "Đăng nhập thành công";
                    var dashboard = new DashboardWindow(backendUrl);
                    dashboard.Show();
                    Close();
                }
                else
                {
                    ResultText.Text = "Sai thông tin";
                }
            }
            catch (Exception ex)
            {
                ResultText.Text = "Lỗi kết nối backend";
                Console.WriteLine(ex);
            }
        }
    }
}


