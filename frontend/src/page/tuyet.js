// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Tinhthanh = () => {
//   return ( 
//     <div className="lg:grid max-w-[95%] lg:grid-cols-3 mx-auto lg:gap-4  sm:grid sm:grid-flow-row sm:grid-row-3 py-20 ">
//         <div className="lg:col-span-2">
//           <div
//             id="indicators-carousel"
//             className="relative w-full h-full"
//             data-carousel="static"
//           >
//             <div className="relative lg:h-full overflow-hidden rounded-lg sm:h-96 ">
//               <div
//                 class="hidden duration-700 ease-in-out "
//                 data-carousel-item="active"
//               >
//                 <img
//                   src="https://img.meta.com.vn/Data/2020/Thang12/giang-sinh-720x445.png"
//                   className="cover absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
//                   alt="..."
//                 />
//               </div>

//               <div class="hidden duration-700 ease-in-out" data-carousel-item>
//                 <img
//                   src="https://stcv4.hnammobile.com/contents/800x420.jpg"
//                   className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
//                   alt="..."
//                 />
//               </div>

//               <div class="hidden duration-700 ease-in-out" data-carousel-item>
//                 <img
//                   src="https://baotinmobile.vn/uploads/2023/03/sl-iphone-14-promax.jpg.webp"
//                   className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
//                   alt="..."
//                 />
//               </div>

//               <div class="hidden duration-700 ease-in-out" data-carousel-item>
//                 <img
//                   src="https://baotinmobile.vn/uploads/2023/09/banner-15.jpg.webp"
//                   class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//                   alt="..."
//                 />
//               </div>

//               <div class="hidden duration-700 ease-in-out" data-carousel-item>
//                 <img
//                   src="https://clevertech.vn/wp-content/uploads/2023/10/banner-clv-thang8202312-iphone152.png"
//                   class="absolute block w-full  h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
//                   alt="..."
//                 />
//               </div>
//             </div>

//             <div class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
//               <button
//                 type="button"
//                 class="w-3 h-3 rounded-full"
//                 aria-current="true"
//                 aria-label="Slide 1"
//                 data-carousel-slide-to="0"
//               ></button>
//               <button
//                 type="button"
//                 class="w-3 h-3 rounded-full"
//                 aria-current="false"
//                 aria-label="Slide 2"
//                 data-carousel-slide-to="1"
//               ></button>
//               <button
//                 type="button"
//                 class="w-3 h-3 rounded-full"
//                 aria-current="false"
//                 aria-label="Slide 3"
//                 data-carousel-slide-to="2"
//               ></button>
//               <button
//                 type="button"
//                 class="w-3 h-3 rounded-full"
//                 aria-current="false"
//                 aria-label="Slide 4"
//                 data-carousel-slide-to="3"
//               ></button>
//               <button
//                 type="button"
//                 class="w-3 h-3 rounded-full"
//                 aria-current="false"
//                 aria-label="Slide 5"
//                 data-carousel-slide-to="4"
//               ></button>
//             </div>

//             <button
//               type="button"
//               class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//               data-carousel-prev
//             >
//               <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                 <svg
//                   class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 6 10"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M5 1 1 5l4 4"
//                   />
//                 </svg>
//                 <span class="sr-only">Previous</span>
//               </span>
//             </button>
//             <button
//               type="button"
//               class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//               data-carousel-next
//             >
//               <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                 <svg
//                   class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 6 10"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m1 9 4-4-4-4"
//                   />
//                 </svg>
//                 <span class="sr-only">Next</span>
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="lg:col-span-1  lg:grid grid-rows-2 grid-flow-col gap-4">
//           <div className=" bg-gradient-to-r from-red-700 to-rose-300
//                      hover:from-pink-300 hover:to-slate-300 text-yellow-100 
//                      border rounded-3xl flex items-center justify-between px-10
//                      shadow-lg transform transition-all 
//                       duration-500 ease-in-out hover:scale-10 hover:brightness-10 
//                       hover:animate-pulse active:animate-bounce
//                      ">
//             <div className="text-white py-2">
//               <p className="text-xl font-medium uppercase">Oppo</p>
//               <p className="text-sm">Phản hồi tức thì</p>
//               <p className="text-2xl mb-1">Giữ nhịp vui cuộc sống</p>
//               <button class="py-1 px-3 rounded-full bg-green-600 text-white font-bold transition duration-500 transform hover:bg-green-400 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
//                 Mua ngay
//               </button>
//             </div>
//             <div className="w-[120px] h-[120px]">
//               <img
//                 src="https://cdn.hoanghamobile.com/i/preview/Uploads/2023/03/20/tim-n-flip.png"
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           <div className=" border bg-gradient-to-r from-yellow-300 to-pink-200
//                      hover:from-pink-300 hover:to-slate-300 text-yellow-100
//                       hover:text-black rounded-3xl flex items-center justify-between px-10 sm:mt-2 
//                       shadow-lg transform transition-all 
//                       duration-500 ease-in-out hover:scale-10 hover:brightness-10 
//                       hover:animate-pulse active:animate-bounce">
//             <div className="text-white py-2">
//               <p className="text-xl font-medium uppercase ">SAMSUNG</p>

//               <p className="text-sm">GALAXY S23 ULTRA </p>
//               <p className="text-2xl mb-1 ">
//                 “Tân vương của điện thoại camera”
//               </p>
//               <button class="py-1 px-3 rounded-full bg-green-600 text-white font-bold transition duration-500 transform hover:bg-green-400 hover:scale-110 active:bg-blue-700 active:scale-98 focus:outline-none">
//                 Mua ngay
//               </button>
//             </div>
//             <div className="w-[120px] h-[120px]">
//               <img
//                 src="https://www.pngall.com/wp-content/uploads/13/Galaxy-S23-Ultra-PNG-HD-Image.png"
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// export default Tinhthanh;
