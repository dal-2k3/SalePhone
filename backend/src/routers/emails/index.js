const express = require("express");
const nodeMailer = require("nodemailer");
const emailRouter = express.Router();

emailRouter.post("/", async (req, res) => {
  const { fullname, phone, email, address, total, order_details} = req.body;

  if (!order_details || !Array.isArray(order_details) || order_details.length === 0) {
    return res.status(400).json({ message: 'Invalid request data' });
}
  const subject = "Hóa Đơn Đặt Hàng";
  const status = false;


  const htmlHead = `<table style="width:50%">
    <tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>`;

  let htmlContent = "";

  for (let i = 0; i < order_details.length; i++) {
    htmlContent += `<tr>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${
        order_details[i].nameProduct
      }</td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src=${
        order_details[i].image_product
      }width="80" height="80"></td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${
        order_details[i].totalDetail
      }$</td>
      <td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">${
        order_details[i].quatity
      }</td>
    <tr>`;
  }
  const htmlResult = `
  <h1>Xin Chào ${fullname}</h1>
  <h3>Phone: ${phone}</h3>
  <h3>Address: ${address}</h3>
    ${htmlHead}
    ${htmlContent}
  <h1>Tổng Thanh Toán: ${total}$
  <p>Cảm ơn bạn!</p>
    `;

  const info = await sendMail(email, subject, htmlResult);

  res.status(200).send({ sendEmail: nodeMailer.getTestMessageUrl(info)});
});

module.exports = emailRouter;
