import React, { useEffect, useState } from "react";
import {
  deleteComments,
  getCommentsPrivate,
  getCommentsPublic,
  updateComments,
} from "../../../services/comments";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListComment() {
  const [commentsPrivate, setCommentsPrivate] = useState([]);
  const [commentsPublic, setCommentsPublic] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [reload, setReload] = useState(false);
  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const status = {
    status: "public",
  };
  const saveEdit = async (id) => {
    try {
      console.log(id);
      await updateComments(id, status);
      setReload((prevReload) => !prevReload);
      toast.success("Duyệt đánh giá thành công");
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Nếu có response từ server
        const statusCode = error.response.status;
        if (statusCode === 501) {
          // Xử lý lỗi 500, 501 và hiển thị thông báo
          toast.warn("Lỗi khi duyệt đánh giá");
        } else {
          // Xử lý các lỗi khác và hiển thị thông báo
          const errorMessage =
            error.response.data.message || "Đã xảy ra lỗi khi duyệt đánh giá.";
          toast.error(errorMessage);
        }
      } else {
        // Nếu không có response từ server (ví dụ: không thể kết nối đến server)
        toast.error("Lỗi kết nối.");
      }
    }
  };

  const saveDelete = async (id) => {
    try {
      await deleteComments(id);
      setReload((prevReload) => !prevReload);
      toast.success("Xóa đánh giá thành công");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchlistscommentsPrivate = async () => {
      try {
        const setcommentsprivate = await getCommentsPrivate();
        setCommentsPrivate(setcommentsprivate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlistscommentsPrivate();

    const fetchlistscommentsPublic = async () => {
      try {
        const setcommentspublic = await getCommentsPublic();
        setCommentsPublic(setcommentspublic);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlistscommentsPublic();
  }, [reload]);
  return (
    <div>
      <div className="justify-center ">
        <button
          className={`py-1 pr-4 font-bold text-2xl border-b-4 ${
            activeTab === 1 ? "text-cyan-500 border-y-cyan-500" : "text-black"
          }`}
          onClick={() => changeTab(1)}
        >
          Bình luận chưa xử lý
        </button>
        <button
          className={`py-1 pr-4 font-bold text-2xl border-b-4 ${
            activeTab === 2 ? "text-cyan-500 border-y-cyan-500" : "text-black"
          }`}
          onClick={() => changeTab(2)}
        >
          Bình luận đã xử lý
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 1 && (
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left dark:bg-meta-4 bo">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black  xl:pl-11">
                    Tên
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                    Rating
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                    Nội dung
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                    Thời gian
                  </th>
                  <th className="py-4 px-4 font-medium text-black ">
                    Trạng thái
                  </th>
                  <th className="py-4 px-4 font-medium text-black ">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {commentsPrivate.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1  text-lg font-light text-black">
                        {item.username}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5  dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-6 h-6  ${
                              index < item.rating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {item.content}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5  dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light  text-black">
                        {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-50 py-1 px-3 text-sm font-medium text-green-600">
                        {item.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => saveEdit(item.id)}
                        >
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                stroke="#508D69"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M7.75 12L10.58 14.83L16.25 9.17004"
                                stroke="#508D69"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => saveDelete(item.id)}
                        >
                          <svg
                            className="fill-current text-red-500"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* {commentsPublic.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {item.username}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-6 h-6  ${index < item.rating
                              ? "text-yellow-500"
                              : "text-gray-400"
                              } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {item.content}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light  text-black">
                        {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-50 py-1 px-3 text-sm font-medium text-green-600">
                        {item.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => saveDelete(item.id)}
                        >
                          <svg
                            className="fill-current text-red-500"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left dark:bg-meta-4 bo">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black  xl:pl-11">
                    Tên
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                    Rating
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                    Nội dung
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                    Thời gian
                  </th>
                  <th className="py-4 px-4 font-medium text-black ">
                    Trạng thái
                  </th>
                  <th className="py-4 px-4 font-medium text-black ">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {commentsPublic.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1  text-lg font-light text-black">
                        {item.username}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5  dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-red-300 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-6 h-6  ${
                              index < item.rating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light text-black">
                        {item.content}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5  dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-0 py-1 px-3 text-lg font-light  text-black">
                        {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-green-200 bg-opacity-50 py-1 px-3 text-sm font-medium text-green-600">
                        {item.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => saveDelete(item.id)}
                        >
                          <svg
                            className="fill-current text-red-500"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
