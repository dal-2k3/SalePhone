
import ListCategoris from "../components/Admin/categories/listCategoris";
import HomeAdmin from "../components/Admin/homeAdmin";
import Test from "../components/Admin/products/phong";
import AddProduct from "../components/Admin/products/add";

import ListProducts from "../components/Admin/products/listProducts";
import ProductDetail from "../components/Admin/products/productDetail";
import ListUsers from "../components/Admin/users/listUsers";
import Abc from "../components/Admin/products/phong";

const adminRouter = [
    {
        path: "/admin",
        component: HomeAdmin
    },
    {
        path: "/users/list",
        component: ListUsers
    },

    {
        path: "/categories/list",
        component: ListCategoris
    },
    {
        path: "/products/add",
        component: AddProduct
    },
    {
        path: "/products/list",
        component: ListProducts
    },
    {
        path: "/products/product_detail",
        component: ProductDetail
    },
    {
        path: "/test",
        component: Abc
    },

]
export default adminRouter;