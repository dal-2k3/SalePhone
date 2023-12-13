import React from 'react';
import { loginUser } from '../../services/API/authApi';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError('authentication', {
        type: 'manual',
        message: 'Invalid email or password',
      });
      toast.error('Invalid email or password');
    }
  };

  return (
    <>
      <body className="antialiased bg-gray-200 text-gray-900 font-sans">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
            <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">Username or Email</label>
                <input
                  {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                  className={`w-full border rounded p-2 outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                  type="email"
                  id="email"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="password" className="block text-xs mb-1">Password</label>
                <input
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full border rounded p-2 outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
                type="submit"
              >
                Login
              </button>
            </form>
            <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
          </div>
        </div>
      </body>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}