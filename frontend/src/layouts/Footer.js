import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";

const Footer = () => {
  return (
    <footer className="bg-[#294f38] text-white w-full">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-3">
        <h1
          className="lg:text-3xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
        >
          Tư vấn mua hàng, nhận ưu đãi đặc biệt <span className="text-teal-400">Miễn phí</span> 
        </h1>
        <div>
          <input
            type="text"
            placeholder="Nhập email của bạn..."
            className="text-gray-800
           sm:w-72 w-full lg:mr-3 lg:mb-0 mb-4 py-2.5 rounded-lg px-2 focus:outline-none"
          />
          <button
            className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 
           rounded-lg  text-white md:w-auto w-full"
          >
            Đăng kí
          </button>
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Appy. Đã đăng ký Bản quyền.</span>
        <span>Điều khoản · Chính sách bảo mật</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;