import Cart from "../components/Cart";
import ListProducts from "../components/ListProducts";
import ProductDetail from "../components/ProductDetail";
import Tinhthanh from "../page/tuyet";

const { default: Home } = require("../page/Home");

const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/listproducts/:id",
        component: ListProducts
    },
    {
        path: "/product_detail/:id",
        component: ProductDetail
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path: "/tinhthanh",
        component: Tinhthanh
    },


]
export default publicRoutes;