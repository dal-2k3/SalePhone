import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../../services/API/authApi";

export default function Register() {
  const { register, handleSubmit, setError, formState: { errors }, setValue, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await registerUser(data);
      toast.success('Đăng ký thành công!');
      navigate('/login'); // Chuyển hướng sau khi đăng ký thành công
    } catch (error) {
      console.error('Registration error:', error);
      // Xử lý lỗi và hiển thị thông báo
      if (error.response) {
        // Nếu có response từ server
        const statusCode = error.response.status;

        if (statusCode === 409) {
          toast.warn('Email của bạn đã tồn tại!');
        } else if (statusCode === 401) {
          toast.warn('Mã xác nhận admin không đúng. Mời nhập lại');
        } else {
          // Xử lý các lỗi khác và hiển thị thông báo
          const errorMessage = error.response.data.message || 'Đã xảy ra lỗi khi đăng ký.';
          toast.error(errorMessage);
        }
      } else {
        // Nếu không có response từ server (ví dụ: không thể kết nối đến server)
        toast.error('Unable to connect to the server. Please try again later.');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setValue(field, value);
  };

  return (
    <div className="">
      <div className="bg-slate-100 flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl text-center font-bold text-green-700 mb-4">Đăng ký Admin</h2>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('username', { required: 'Họ và tên là bắt buộc' })}
              type="text"
              className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Họ và tên..."
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}

            <input
              {...register('email', { required: 'Email là bắt buộc', pattern: /^\S+@\S+$/i })}
              type="email"
              className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Email..."
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

            <input
              {...register('phone', {
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Số điện thoại phải là kiểu số từ 0-9',
                },
                minLength: {
                  value: 10,
                  message: 'Số điện thoại phải là 10 số',
                },
                maxLength: {
                  value: 10,
                  message: 'Số điện thoại không được vượt quá 10 số',
                },
              })}
              type="text"
              className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Số điện thoại..."
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

            <input
              {...register('password', {
                required: 'Password là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',
                },
              })}
              type="password"
              className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Password...."
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

            <input
              {...register('code', { required: 'Mã xác nhận là bắt buộc' })}
              type="text"
              className={`bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${errors.code ? 'border-red-500' : ''}`}
              placeholder="Mã xác nhận admin..."
              onChange={(e) => handleInputChange('code', e.target.value)}
            />
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}


            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-gray-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-700 transition ease-in-out duration-150"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}