const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-[18px] text-pink-500 uppercase">Salephone</h2>
        {/* <div className="">
          <img src="../../public/image/logo.png" alt="" className="" />
        </div> */}
        <p className="my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, deleniti
          dolores vel ipsa reiciendis corporis similique dolor earum aut itaque.
        </p>
      </div>
      <div>
        <li className="text-[18px] list-none font-semibold text-pink-500 py-2 uppercase">
          Chính sách
        </li>
        <li className="my-4 list-none ">Chính sách bảo hành</li>
        <li className="my-4 list-none">Chính sách đổi tra</li>
        <li className="my-4 list-none">Chính sách giao hàng</li>
        <li className="my-4 list-none">Chính sách khui hộp</li>
      </div>
      <div>
        <li className="text-[18px] list-none font-semibold text-pink-500 py-2 uppercase">
          Tra Cứu thông tin
        </li>
        <li className="my-4 list-none">Tra cứu hóa đơn điện tử</li>
        <li className="my-4 list-none">Tra cứu ưu đãi của bạn</li>
        <li className="my-4 list-none">Trung tâm bảo hàng</li>
      </div>
      <div>
        <li className="text-[18px] list-none font-semibold text-pink-500 py-2 uppercase">
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
