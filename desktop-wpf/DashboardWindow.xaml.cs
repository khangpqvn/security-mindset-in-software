using System.Windows;

namespace SecurityMindset.Wpf
{
    public partial class DashboardWindow : Window
    {
        private readonly string backendUrl;

        public DashboardWindow(string backendUrl)
        {
            InitializeComponent();
            this.backendUrl = backendUrl;
            BackendLabel.Text = $"Backend: {backendUrl}";
        }
    }
}


