import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
      <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
      <img src="https://img.upanh.tv/2023/12/03/image9a5fc50cb2d55cb7.png" alt="404" />
      <p className="text-gray-500">Xin lỗi, trang bạn đang tìm kiếm không tồn tại. Chúng tôi sẽ cố gắng sửa chữa nhanh chóng. <br/> Hãy quay lại trang chủ để khám phá thêm!</p>
        <a href="/" className="inline-block mt-4 px-6 py-3 text-white bg-orange-500  rounded-lg text-xl hover:bg-pink-600 transition duration-300">Quay về trang chủ</a>
      </div>
    </div>
    )
  }
}
