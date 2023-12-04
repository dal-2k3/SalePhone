const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-5">
      <div className="flex flex-col gap-3">
        <a className="w-[200px] h-[100px]">
          <img src="/image/SP.png" alt="" className="w-full h-full" />
        </a>
        <p className="my-4">
          SalePhone - Website Cửa Hàng Điện Thoại tập trung vào tối ưu hóa trải
          nghiệm mua sắm trực tuyến và ứng dụng di động.
        </p>
      </div>
      <div>
        <li className="text-[17px] list-none font-semibold text-white py-2 uppercase">
          Chính sách
        </li>
        <li className="my-4 list-none ">Chính sách bảo hành</li>
        <li className="my-4 list-none">Chính sách đổi tra</li>
        <li className="my-4 list-none">Chính sách giao hàng</li>
        <li className="my-4 list-none">Chính sách khui hộp</li>
      </div>
      <div>
        <li className="text-[17px] list-none font-semibold text-white py-2 uppercase">
          Tra Cứu thông tin
        </li>
        <li className="my-4 list-none">Tra cứu hóa đơn điện tử</li>
        <li className="my-4 list-none">Tra cứu ưu đãi của bạn</li>
        <li className="my-4 list-none">Trung tâm bảo hàng</li>
      </div>
      <div>
        <li className="text-[17px] list-none font-semibold text-white py-2 uppercase">
          Tư vấn đặt hàng
        </li>
        <li className="my-4 list-none">Phương thức thanh toán</li>
        <li className="my-4 list-none">Hướng dẫn đặt hàng</li>
        <li className="my-4 list-none">Góp ý kiếu nại</li>
      </div>
    </div>
  );
};

export default ItemsContainer;
