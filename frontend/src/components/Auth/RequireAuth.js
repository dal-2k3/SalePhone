import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      const isAuthenticated = !!localStorage.getItem('token');

      // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [navigate]);

    // Trả về component đã được bọc
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default RequireAuth;