
import ListCategoris from "../components/Admin/categories/listCategoris";
import HomeAdmin from "../components/Admin/homeAdmin";
import AddProduct from "../components/Admin/products/add";
import ListProducts from "../components/Admin/products/listProducts";
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
        path: "/products/add",
        component: AddProduct
    },
    {
        path: "/products/list",
        component: ListProducts
    },

]
export default adminRouter;