// src/components/NewsLayout.js
import React from 'react';

const NewsLayout = () => {
  const newsData = [
    {
      id: 1,
      title: 'Đây sẽ là ý do nhất định phải sắm OPPO A79 5G dịp cuối năm, có lẽ bạn chưa biết',
      thumbnailUrl: 'https://cdn.tgdd.vn/News/Thumb/1556334/h2-fix-1-1200x675.jpg',
      excerpt: 'Màn hình cũng sẽ là một tiêu chí quan trọng để người dùng cân nhắc khi chọn mua một chiếc smartphone...',
    },
    {
      id: 2,
      title: 'Redmi Note 13 Series bị rò rỉ giá tại thị trường quốc tế, liệu có dễ tiếp cận?',
      thumbnailUrl: 'https://cdn.tgdd.vn/News/Thumb/99/thumb-16-1200x675.jpg',
      excerpt: 'Xiaomi đã cho ra mắt dòng Redmi Note 13 tại Trung Quốc vào tháng 9 vừa qua...',
    },
    {
      id: 3,
      title: 'iPhone 14 series giảm giá, duy nhất 2 ngày cuối tuần, mua ngay kẻo hết!',
      thumbnailUrl: 'https://cdn.tgdd.vn/News/Thumb/1556493/iphone14seriesggct12-2-1-1200x675.jpg',
      excerpt: 'iPhone 14 series vẫn là dòng sản phẩm đáng mua ở thời điểm hiện tại. Cuối tuần này lại còn đáng mua hơn vì được giảm sốc...',
    },
    {
      id: 4,
      title: 'OPPO Reno10 series đồng giảm 500K, tất cả đều hỗ trợ trả góp 0%, mua ngay cuối tuần này',
      thumbnailUrl: 'https://cdn.tgdd.vn/News/Thumb/1556308/oppo-1200x675.jpg',
      excerpt: 'Siêu phẩm mới nhà OPPO đã trình làng với nhiều mong đợi đột phá về thiết kế sang trọng, hiệu năng mạnh mẽ...',
    },
  ];
  const mostReadData = [
    {
      id: 1,
      title: 'Tuần qua công nghệ có gì HOT 30/11: Rò rỉ mới về Galaxy S24 Series, realme GT5 Pro lộ diện với mặt lưng da',
    },
    {
      id: 2,
      title: 'Đánh giá OPPO A79 5G: Thiết kế chỉn chu, chip Dimensity 6020 mang lại hiệu năng tốt, pin khỏe, camera chụp ảnh bắt mắt',
    },
    {
      id: 3,
      title: 'Được xem là sự lựa chọn tốt ưu nhất thị trường hiện nay, Redmi K70E giá bao nhiêu?',
    },
    {
      id: 4,
      title: 'Ngoài chip Dimensity 8300 Ultra, cấu hình Redmi K70E có gì mà hót hòn họt tới vậy?',
    },
    {
      id: 5,
      title: 'Galaxy S series giảm đến 14 triệu, Galaxy S23 FE còn tặng thêm tai nghe Buds FE',
    },
    {
      id: 6,
      title: 'Kỳ vọng POCO X6 Neo concept: Thiết kế vuông vức, chip Snapdragon 7+ Gen 2, camera 108 MP',
    },
    
    
  ];

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto pt-16">
        <header className="bg-white py-4 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div className=" text-2xl font-bold flex space-x-4 pl-10">
              <h2>TIN CÔNG NGHỆ</h2>
            </div>
          </div>
        </header>
        <main className="grid grid-cols-12 gap-8 p-8">
          {/* Left Column */}
          <div className="col-span-8">
            {/* Featured News */}
            <div className="mb-8">
              <img
                src="https://cdn.tgdd.vn/News/Thumb/1556483/Galaxy-S24-Ultra-du-kien-se-khong-co-camera-tele-10x-nhu-Galaxy-S23-Ultra-5G-1200x675.jpg"
                alt="Featured News"
                className="w-full h-108 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">
                Rò rỉ mới nhất về Galaxy S24 Series: Màu sắc mới, khung titan, vi xử lý riêng biệt
              </h2>
              <p className="text-gray-600">
                Galaxy S24 Series được đồn đoán sẽ có các tuỳ chọn màu sắc mới là Onyx Black, Marble Grey, Cobalt Violet và Amber Yellow. Samsung cũng sẽ nâng cấp mạnh mẽ các tính năng AI trong các ứng dụng Nhắn tin và Trình sửa Ảnh. Hãng dự kiến sẽ tăng kích thước tản nhiệt buồng hơi lên 1.5 - 1.6 lần so với thế hệ trước....
              </p>
            </div>
            {/* Other News */}
            <div className="grid grid-cols-2 gap-4">
              {newsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-md shadow-md transition duration-300 hover:shadow-lg"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={`News ${item.id}`}
                    className="w-full h-46 object-cover mb-4 rounded-md"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">
                    {item.excerpt}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-xl font-semibold mb-4">Video</h2>
              {/* Thay thế 'YOUR_VIDEO_URL' bằng đường dẫn video thực tế */}
              <iframe width="930" height="523" src="https://www.youtube.com/embed/cXOCa2-3pv8" title="Chi Tiết Galaxy A14 5G: NGON - BỔ - RẺ, ĐÁNG MUA TRONG CUỐI NĂM !! | Thế Giới Di Động" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-4">
            
            <div className=" ">
              <img src='https://cdn.tgdd.vn/2023/11/banner/380x215-380x215-1.png' className='w-full'></img>
              
            </div>
            {/* Most Read */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-4">Đọc nhiều nhất</h2>
        <ul>
          {mostReadData.map((item, index) => (
            <li
              key={item.id}
              className={`text-blue-600 mb-2 cursor-pointer hover:text-black transition duration-300 ${
                index !== mostReadData.length - 1 ? 'pb-2 border-b border-gray-300' : ''
              }`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsLayout;
