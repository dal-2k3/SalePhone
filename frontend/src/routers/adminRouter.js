import ListCategoris from "../components/Admin/categories/listCategoris";
import ListComment from "../components/Admin/comments/ListComment";
import HomeAdmin from "../components/Admin/homeAdmin";
import ListOrder from "../components/Admin/oders/ListOrder";
import OrderDetail from "../components/Admin/oders/OrderDetail";
import ListProducts from "../components/Admin/products/listProducts";
import ProductDetail from "../components/Admin/products/productDetail";
import ListUsers from "../components/Admin/users/listUsers";
import RequireAuth from "../components/Auth/RequireAuth";
import NotFound from "../components/NotFound";
 // Import HOC

const adminRouter = [
    {
        path: "/admin",
        component: RequireAuth(HomeAdmin)
    },
    {
        path: "/users/list",
        component: RequireAuth(ListUsers)
    },
    {
        path: "/categories/list",
        component: RequireAuth(ListCategoris)
    },
    {
        path: "/products/list",
        component: RequireAuth(ListProducts)
    },
    {
        path: "/products/detail/:id",
        component: RequireAuth(ProductDetail)
    },
    {
        path: "/comments/list",
        component: RequireAuth(ListComment)
    },
    {
        path: "/orders/list",
        component: RequireAuth(ListOrder)
    },
    {
        path: "/orders/detail/:id",
        component: RequireAuth(OrderDetail)
    },
    {
        path: "*",
        component: RequireAuth(NotFound)
    },
];

export default adminRouter;
