
import ListCategoris from "../components/Admin/categories/listCategoris";
import HomeAdmin from "../components/Admin/homeAdmin";
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


]
export default adminRouter;