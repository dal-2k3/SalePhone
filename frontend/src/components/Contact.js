import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu gửi đi ở đây (ví dụ: gửi đến API hoặc xử lý ở phía máy chủ)
    console.log('Submitted data:', formData);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto pt-16">
        <header className="bg-white py-4 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 pl-10">
              <h2 className="text-3xl font-semibold mb-2"> Liên hệ </h2>
            </div>
          </div>
        </header>
        <main className="grid grid-cols-12 gap-8 p-8">
          {/* Cột trái */}
          <div className="col-span-8">
            {/* Tin nổi bật */}
            <div className="mb-8">
              <form
                className="bg-white p-6 rounded-md shadow-md mb-4"
                onSubmit={handleSubmit}
              >
                <h2 className="text-xl font-semibold mb-4">Liên hệ chúng tôi</h2>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-600">
                    Họ và tên:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-600">
                    Nội dung:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Gửi
                </button>
              </form>
            </div>
            {/* Tin khác */}
            <div className="grid grid-cols-2 gap-4">
              
            </div>
          </div>

          {/* Cột phải */}
          <div className="col-span-4">
            <iframe
              width="460"
              height="350"
              src="https://www.openstreetmap.org/export/embed.html?bbox=108.10229301452638%2C16.03302758803864%2C108.21267127990724%2C16.089444193336433&amp;layer=mapnik"
              className="border-1 border-solid border-black"
            ></iframe>

            {/* Thông tin liên hệ */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
              <p className="text-gray-600">
                <strong>Địa chỉ:</strong> 137 Nguyễn Thị Thập, Liên chiểu, Đà Nẵng
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> salephone@gmail.com
              </p>
              <p className="text-gray-600">
                <strong>Điện thoại:</strong> (+84) 123456789
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
