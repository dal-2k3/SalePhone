import Login from "../components/Auth/Login";
import Cart from "../components/Cart";
import Contact from "../components/Contact";
import ListProducts from "../components/ListProducts";
import NewsLayout from "../components/New";
import NotFound from "../components/NotFound";
import ProductDetail from "../components/ProductDetail";
import { Example } from "../components/address";


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
        path: "/test",
        component: Example
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/notfound",
        component: NotFound
    },
    {
        path: "/news",
        component: NewsLayout
    },
    {
        path: "/contact",
        component: Contact
    },

]
export default publicRoutes;