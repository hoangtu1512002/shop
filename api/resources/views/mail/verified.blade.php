<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333333;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
        }

        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }

        .footer {
            background-color: #f4f4f4;
            color: #777777;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }

        .footer p {
            margin: 5px 0;
        }

    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Xác nhận địa chỉ email của bạn</h1>
        </div>
        <div class="content">
            <p>Xin chào {{ $email }},</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại [Tên công ty]. Vui lòng nhấp vào nút bên dưới để xác nhận địa chỉ
                email của bạn:</p>
            <a href="{{ route('api.email.verified', ['token' => $token]) }}" style="color: #fff;" class="btn">Xác nhận email</a>
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 [Tên công ty]. Mọi quyền được bảo lưu.</p>
            <p>[Địa chỉ công ty]</p>
        </div>
    </div>
</body>

</html>
