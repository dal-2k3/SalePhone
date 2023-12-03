
import ListCategoris from "../components/Admin/categories/listCategoris";
import ListComment from "../components/Admin/comments/ListComment";
import HomeAdmin from "../components/Admin/homeAdmin";
import ListOrder from "../components/Admin/oders/ListOrder";
import OrderDetail from "../components/Admin/oders/OrderDetail";
import ListProducts from "../components/Admin/products/listProducts";
import ProductDetail from "../components/Admin/products/productDetail";
import ListUsers from "../components/Admin/users/listUsers";


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
        path: "/products/list",
        component: ListProducts
    },
    {
        path: "/products/detail/:id",
        component: ProductDetail
    },
    {
        path: "/comments/list",
        component: ListComment
    },
    {
        path: "/orders/list",
        component: ListOrder
    },
    {
        path: "/orders/detail/:id",
        component: OrderDetail
    },

]
export default adminRouter;