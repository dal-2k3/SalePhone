import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Phần 1: Thông tin liên hệ */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Liên hệ</h2>
            <p>Địa chỉ: 137 Nguyễn Thị Thập</p>
            <p>Email: salephone@gmail.com</p>
            <p>Điện thoại: (+84) 456-7890</p>
          </div>

          {/* Phần 2: Liên kết */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Liên kết hữu ích</h2>
            <ul>
              <li>
                <a href="#">Về chúng tôi</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#">Điều khoản sử dụng</a>
              </li>
              {/* Thêm các liên kết khác cần thiết */}
            </ul>
          </div>

          {/* Phần 3: Đăng ký nhận tin */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Đăng ký nhận tin</h2>
            <p>Nhận thông báo về sản phẩm mới và khuyến mãi.</p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Đăng ký
              </button>
            </form>
          </div>

          {/* Phần 4: Logo */}
          <div className="flex items-center justify-center md:col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Logo" className="w-24 h-24" />
          </div>
        </div>

        {/* Phần chân trang nhỏ */}
        <div className="mt-8 text-center">
          <p>&copy; 2023 SalePhone.</p>
        </div>
      </footer>
    </div>
  );
}
