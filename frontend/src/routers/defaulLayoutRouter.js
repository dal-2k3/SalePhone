import Cart from "../components/Cart";
import ListProducts from "../components/ListProducts";
import ProductDetail from "../components/ProductDetail";


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



]
export default publicRoutes;