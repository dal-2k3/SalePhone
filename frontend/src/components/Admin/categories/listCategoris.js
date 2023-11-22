import React, { useEffect, Fragment, useRef, useState } from "react";
import {
  AddCategories,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../../../services/categories/categories";
import { Dialog, Transition } from "@headlessui/react";
import EditCategory from "./EditCategory";
import { DOMAIN } from "../../../utils/settings/config";

export default function ListCategoris() {
  const [categories, setcategories] = useState([0]);
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingCategory, seteditingCategory] = useState(null);

  const cancelButtonRef = useRef(null);

  const [category, setCategory] = useState({
    name: "",
    logo: null, // Đối tượng File
    note: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: name === "logo" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("logo", category.logo);
      formData.append("note", category.note);

      // Gọi API để thêm mới category
      await AddCategories(formData);
      setReload((prevReload) => !prevReload);
      setCategory({
        name: "",
        logo: null,
        note: "",
      });
      setOpenAdd(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEdit = (category) => {
    seteditingCategory(category);
  };
  const handleCancelEdit = () => {
    seteditingCategory(null);
  };
  const handleSave = async (editedCategory) => {
    try {
      // Gọi API để cập nhật thông tin người dùng
      const updatedCategory = await updateCategory(
        editingCategory.id,
        editedCategory
      );
      console.log(editedCategory);

      // Cập nhật danh sách người dùng
      const updatedCategories = categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      setReload(!reload);
      setcategories(updatedCategories);

      seteditingCategory(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // delete
  const handleDelete = async (id) => {
    console.log(id);
    await deleteCategory(id);
    setReload(!reload);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const categoriesData = await listCategories();
        setcategories(categoriesData);
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };
    fetchUsers();
  }, [reload]);

  return (
    <div className="flex flex-col">
      <div className="p-2">
        <button
          onClick={() => setOpenAdd(true)}
          className=" bg-yellow-600 text-white py-1 px-2 mr-2 rounded transition duration-150 ease-in-out ..."
        >
          Add Category
        </button>
      </div>

      <Transition.Root show={openAdd} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpenAdd}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm: flex sm:items-start ">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h1"
                          className=" text-center font-semibold leading-6 text-2xl p-7 text-cyan-900"
                        >
                          Add Category
                        </Dialog.Title>
                        <div className=" ">
                          <form className="w-full" onSubmit={handleSubmit}>
                            <label className="block mb-4 text-sm font-bold">
                              Category Name:
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={category.name}
                              onChange={handleChange}
                              className="w-full p-2 mb-4 border rounded"
                              required
                            />

                            <label className="block mb-2 text-sm font-bold">
                              Logo Image:
                            </label>
                            <input
                              type="file"
                              name="logo"
                              onChange={handleChange}
                              className="w-full p-2 mb-4 border rounded"
                              accept="image/*"
                              required
                            />

                            <label className="block mb-2 text-sm font-bold">
                              Note:
                            </label>
                            <textarea
                              name="note"
                              value={category.note}
                              onChange={handleChange}
                              className="w-full p-2 mb-4 border rounded"
                            />
                            <button
                              onClick={() => setOpenAdd(false)}
                              ref={cancelButtonRef}
                              className="mt-3 inline-flex w-full justify-center rounded-md
                                                             bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                                                             shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
                                                             sm:mt-0 sm:w-auto"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                              Add Category
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Note
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className=" w-12 rounded-md">
                        <img
                          className="max-w-full"
                          src={`${DOMAIN}${item.logo}`}
                          alt="Product"
                        />
                      </div>
                      <b className="text-xs text-black dark:text-white">
                        {item.name}
                      </b>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.note}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-green-200 bg-opacity-30 py-1 px-5 text-sm font-medium text-emerald-700">
                      {item.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(item)}
                      >

                        <svg xmlns="http://www.w3.org/2000/svg"
                          className="fill-current text-green-600"
                          width="18"
                          height="18"
                          enable-background="new 0 0 32 32"
                          viewBox="0 0 32 32"
                          id="update">
                          <path d="M23.7207 8.1641c-3.7872-3.7316-9.6125-4.1499-13.8605-1.2914L9.8483 5.2317c-.002-.2762-.2276-.4985-.5039-.4963L8.3445 4.7432C8.0684 4.7453 7.8464 4.9708 7.8484 5.2468L7.876 8.9893c.0039.5498.4512.9922 1 .9922.002 0 .0049 0 .0078 0l3.743-.0276c.2762-.002.4984-.2277.4963-.5039l-.0078-1.0001c-.0021-.2761-.2276-.4981-.5036-.4961l-.6362.0046c3.3478-1.6712 7.5305-1.1391 10.341 1.6295 2.6972 2.6588 3.4342 6.6558 1.9015 10.0831-.1091.244-.0197.5283.2183.65l.8925.456c.2529.1292.5727.0251.6901-.2334C27.9255 16.3433 27.0319 11.4282 23.7207 8.1641zM23.124 22.0186c-.002 0-.0049 0-.0078 0l-3.743.0275c-.2762.0021-.4984.2277-.4963.5039l.0078 1.0001c.0021.276.2276.498.5036.4961l.6356-.0046c-3.348 1.6708-7.53 1.1382-10.3404-1.6295-2.6972-2.6588-3.4342-6.6559-1.9015-10.0831.1091-.244.0197-.5283-.2183-.65l-.8925-.456c-.2529-.1292-.5727-.0251-.6901.2334-1.9068 4.2002-1.0131 9.1153 2.298 12.3795 2.1396 2.1084 4.9307 3.1592 7.7197 3.1592 2.1475 0 4.2929-.6252 6.1407-1.869l.0119 1.6421c.002.2762.2276.4985.5039.4964l.9999-.0078c.2761-.0022.4981-.2277.4961-.5037l-.0276-3.7424C24.1201 22.4609 23.6729 22.0186 23.124 22.0186z"></path></svg>
                      </button>
                      <button className="hover:text-primary"
                        onClick={() => handleDelete(item.id)}>
                        <svg
                          className="fill-current text-red-600"
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
              {editingCategory && (
                <EditCategory
                  category={editingCategory}
                  onSave={handleSave}
                  onCancel={handleCancelEdit}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
