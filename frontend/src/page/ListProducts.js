export default function ListProducts() {
  return (
    <div>
      <div className="grid max-w-[95%]  px-4 pt-20 pb-8 mx-auto lg:gap-8  lg:py-16 lg:pt-10 bg-cyan-100">
        <div className="flex w-[100%] px-5">
          <div className=" w-[17%]   h-auto mr-5">
            <h2 className="font-semibold text-3xl  leading-6">Danh mục</h2>
            <button className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
              <span className="mr-2 font-medium text-lg">Starbucks</span>
              <img
                src="https://play-lh.googleusercontent.com/59jdBxDvI4qzme3H7e9GSK84FZBY_nlg5dDTlis-VLmHV-RMTLsPLXoqCthdUzBUtlw"
                alt=""
                className="w-[40px] h-[40px]"
              />
            </button>
            <button className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
              <span className="mr-2 font-medium text-lg">Starbucks</span>
              <img
                src="https://play-lh.googleusercontent.com/59jdBxDvI4qzme3H7e9GSK84FZBY_nlg5dDTlis-VLmHV-RMTLsPLXoqCthdUzBUtlw"
                alt=""
                className="w-[40px] h-[40px]"
              />
            </button>
            <button className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
              <span className="mr-2 font-medium text-lg">Starbucks</span>
              <img
                src="https://play-lh.googleusercontent.com/59jdBxDvI4qzme3H7e9GSK84FZBY_nlg5dDTlis-VLmHV-RMTLsPLXoqCthdUzBUtlw"
                alt=""
                className="w-[40px] h-[40px]"
              />
            </button>
            <button className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
              <span className="mr-2 font-medium text-lg">Starbucks</span>
              <img
                src="https://play-lh.googleusercontent.com/59jdBxDvI4qzme3H7e9GSK84FZBY_nlg5dDTlis-VLmHV-RMTLsPLXoqCthdUzBUtlw"
                alt=""
                className="w-[40px] h-[40px]"
              />
            </button>
            <button className="w-[100%] bg-gray-50 px-4 flex items-center justify-between mt-5 py-1 rounded-xl mb-3">
              <span className="mr-2 font-medium text-lg">Starbucks</span>
              <img
                src="https://play-lh.googleusercontent.com/59jdBxDvI4qzme3H7e9GSK84FZBY_nlg5dDTlis-VLmHV-RMTLsPLXoqCthdUzBUtlw"
                alt=""
                className="w-[40px] h-[40px]"
              />
            </button>
            {/* <div className="bg-gray-400 px-5">
              <button className="flex items-center justify-between">
                <span className="mr-2">Starbucks</span>
                <img
                  src="https://play-lh.googleusercontent.com/59jdBxDvI4qzme3H7e9GSK84FZBY_nlg5dDTlis-VLmHV-RMTLsPLXoqCthdUzBUtlw"
                  alt=""
                  className="w-[40px] h-[40px]"
                />
              </button>
            </div> */}
          </div>
          <div className=" w-[83%] ">
            <div className="w-full h-[400px] rounded-3xl border border-solid bg-gray-50 bg-[url('https://i.imgur.com/jY5KJsC.jpg')] bg-no-repeat bg-center bg-cover">
              {/* <img src="https://i.imgur.com/jY5KJsC.jpg" alt="" className="w-full h-full oject-cover" /> */}
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between ">
                <h2 className="font-medium text-2xl ">Total LavAzza 1320</h2>
                <button className="bg-white px-4 py-2 rounded-lg ">
                  Filter
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div class="row-span-1  border border-solid rounded-3xl bg-white shadow-xl">
                  <div className="py-8 flex flex-col items-center">
                    <div className="mb-4 xl:w-[200px] ">
                      <img
                        src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <div className="mb-2">
                        <a href="" className="font-bold">
                          Iphone 15 Pro 128G
                        </a>
                      </div>
                      <div className="">
                        <span className="font-medium text-orange-500 text-lg">
                          31.000.000đ
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="line-through text-gray-400 ">
                          10.000đ
                        </span>
                        <span className="ml-2 px-1 bg-orange-300 text-red-600 rounded-md font-normal">
                          -20%
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row-span-1  border border-solid rounded-3xl bg-white shadow-xl">
                  <div className="py-8 flex flex-col items-center">
                    <div className="mb-4 xl:w-[200px] ">
                      <img
                        src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <div className="mb-2">
                        <a href="" className="font-bold">
                          Iphone 15 Pro 128G
                        </a>
                      </div>
                      <div className="">
                        <span className="font-medium text-orange-500 text-lg">
                          31.000.000đ
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="line-through text-gray-400 ">
                          10.000đ
                        </span>
                        <span className="ml-2 px-1 bg-orange-300 text-red-600 rounded-md font-normal">
                          -20%
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row-span-1  border border-solid rounded-3xl bg-white shadow-xl">
                  <div className="py-8 flex flex-col items-center">
                    <div className="mb-4 xl:w-[200px] ">
                      <img
                        src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <div className="mb-2">
                        <a href="" className="font-bold">
                          Iphone 15 Pro 128G
                        </a>
                      </div>
                      <div className="">
                        <span className="font-medium text-orange-500 text-lg">
                          31.000.000đ
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="line-through text-gray-400 ">
                          10.000đ
                        </span>
                        <span className="ml-2 px-1 bg-orange-300 text-red-600 rounded-md font-normal">
                          -20%
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row-span-1  border border-solid rounded-3xl bg-white shadow-xl">
                  <div className="py-8 flex flex-col items-center">
                    <div className="mb-4 xl:w-[200px] ">
                      <img
                        src="https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/15-Pro-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <div className="mb-2">
                        <a href="" className="font-bold">
                          Iphone 15 Pro 128G
                        </a>
                      </div>
                      <div className="">
                        <span className="font-medium text-orange-500 text-lg">
                          31.000.000đ
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="line-through text-gray-400 ">
                          10.000đ
                        </span>
                        <span className="ml-2 px-1 bg-orange-300 text-red-600 rounded-md font-normal">
                          -20%
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
