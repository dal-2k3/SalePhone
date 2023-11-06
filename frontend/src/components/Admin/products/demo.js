
// const multer = require('multer');

// // Định nghĩa storage cho multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // thư mục lưu trữ ảnh
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // tên tệp sẽ được lưu là một timestamp + tên gốc của tệp
//   },
// });

// const upload = multer({ storage: storage });

// // Sau đó, bạn có thể sử dụng middleware upload trong đường dẫn /addProduct
// app.post('/addProduct', upload.array('image', 2), async (req, res) => {
//   const { idCategory, name, capacity, detailProduct } = req.body;
//   const files = req.files;

//   try {
//     const createdProduct = await Product.create({
//       idCategory,
//       name,
//       capacity,
//     });

//     detailProduct.forEach(async (detail, index) => {
//       const createdDetail = await Detail.create({
//         idProduct: createdProduct.id,
//         color: detail.color,
//         quantity: detail.quantity,
//         imageUrl: files[index].path, // Lưu đường dẫn của ảnh trong detailProduct tương ứng
//       });
//     });

//     res.status(200).json({ message: 'Product and details added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding product and details', error });
//   }
// });
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('idCategory', idCategory);
//     formData.append('name', name);
//     formData.append('capacity', capacity);
//     formData.append('detailProduct', JSON.stringify(detailProduct));
//     images.forEach((image) => {
//       formData.append('image', image);
//     });

//     try {
//       const response = await axios.post('/addProduct', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding product and details', error);
//     }
//   };