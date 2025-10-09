package com.fpt.khangpq.securitymindset;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    private Button btnLogin;
    private EditText edtAccount;
    private EditText edtPassword;

    private void bindingView() {
        btnLogin = findViewById(R.id.btnLogin);
        edtAccount = findViewById(R.id.edtAccount);
        edtPassword = findViewById(R.id.edtPassword);
    }

    private void bindingAction() {
        btnLogin.setOnClickListener(this::onBtnLoginClick);
    }

    private void onBtnLoginClick(View view) {
        String acc = edtAccount.getText().toString();
        String pass = edtPassword.getText().toString();

        if (acc.trim().equalsIgnoreCase("admin") && pass.equals("123456")) {
            Intent i = new Intent(this, Home.class);
            startActivity(i);
        } else {
            Toast.makeText(this, "Thông tin đăng nhập không hợp lệ", Toast.LENGTH_SHORT).show();
        }

    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        bindingView();
        bindingAction();
    }
}