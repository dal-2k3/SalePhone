import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";

export default function Footer() {
  return (
    <footer className="max-w-[100%] bg-gray-800 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
       md:w-2/5"
        >
          <span className="text-teal-400">Free</span> until you're ready to
          launch
        </h1>
        <div>
          <input
            type="text"
            placeholder="Hãy đăng ký"
            className="text-gray-800
         sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins]
         rounded-lg text-white md:w-auto w-full"
          >
            Đặt mua
          </button>
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
    text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Appy. All rights reserved.</span>
        <span>Điều kiện & Chính sách bảo mật</span>
        {/* <SocialIcons Icons={Icons} /> */}
        <div className="text-teal-500">
          {Icons.map((icon) => (
            <span
              key={icon.name}
              className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
            >
              <ion-icon name={icon.name}></ion-icon>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
