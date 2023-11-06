import React, { useState } from 'react';

const EditUserModal = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedUser);

  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-auto">
      <div className="relative w-auto my-6 mx-auto max-w-4xl">
        <div className="border-0 rounded-lg shadow-lg shadow-neutral-300 relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font-sans text-red-500 ">Edit</h3>
          </div>
          <div className="relative p-12 flex-auto">
            <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-auto">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-12"
                type='text'
                value={editedUser.username}

                onChange={handleInputChange}
                name='username'
                placeholder='username'
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                type='email'
                value={editedUser.email}
                onChange={handleInputChange}
                name='email'
                placeholder='email'
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                type='password'
                value={editedUser.password}
                onChange={handleInputChange}
                name='password'
                placeholder='password'
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                type='number'
                value={editedUser.phone}
                onChange={handleInputChange}
                name='phone'
                placeholder='phone'
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                type='text'
                value={editedUser.address}
                onChange={handleInputChange}
                name='address'
                placeholder='address'
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select data-te-select-init className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                name="status" onChange={handleInputChange}
              >
                <option onChange={handleInputChange} name="status" >active</option>
                <option onChange={handleInputChange} name="status"  >inactive</option>

              </select>

            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onCancel}
            >
              Close
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={handleSave}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;