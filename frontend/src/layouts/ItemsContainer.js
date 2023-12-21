const ItemsContainer = () => {
  return (
    <div className="grid  sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 lg:px-32 py-5 justify-center">
      <div className="flex flex-col md:gap-3 items-center">
        <a className="w-[200px] h-[100px]">
          <img src="/image/SP3.png" alt="" className="w-full h-full" />
        </a>
        <p className=" mx-auto px-5">
          SalePhone - Website Cửa Hàng Điện Thoại tập trung vào tối ưu hóa trải
          nghiệm mua sắm trực tuyến và ứng dụng di động.
        </p>
      </div>
      <div className="px-[16px] md:px-0">
        <li className="text-[17px] list-none font-semibold text-yellow-300 py-2 uppercase">
          Chính sách
        </li>
        <li className="sm:my-2 list-none ">Chính sách bảo hành</li>
        <li className="sm:my-2 list-none">Chính sách đổi trả</li>
        <li className="sm:my-2 list-none">Chính sách giao hàng</li>
        <li className="sm:my-2 list-none">Chính sách khui hộp</li>
      </div>
      <div className="px-[16px] md:px-0">
        <li className="text-[17px] list-none font-semibold text-yellow-300 py-2 uppercase">
          Tra Cứu thông tin
        </li>
        <li className="sm:my-2 list-none">Tra cứu hóa đơn điện tử</li>
        <li className="sm:my-2 list-none">Tra cứu ưu đãi của bạn</li>
        <li className="sm:my-2 list-none">Trung tâm bảo hàng</li>
      </div>
      <div className="px-[16px] md:px-0">
        <li className="text-[17px] list-none font-semibold text-yellow-300 py-2 uppercase">
          Tư vấn đặt hàng
        </li>
        <li className="sm:my-2 list-none">Phương thức thanh toán</li>
        <li className="sm:my-2 list-none">Hướng dẫn đặt hàng</li>
        <li className="sm:my-2 list-none">Góp ý kiếu nại</li>
      </div>
    </div>
  );
};

export default ItemsContainer;