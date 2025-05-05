import Product from "../pages/Product";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Calculator from "../pages/Calculator";
import WeightLogs from "../pages/WeightLogs";

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/about", component: <About /> },
  { path: "/product", component: <Product /> },
  { path: "/calculator", component: <Calculator /> },
  { path: "/weight-logs", component: <WeightLogs /> },
  { path: "/contact", component: <Contact /> },
  { path: "/signup", component: <Signup /> },
  { path: "/login", component: <Login /> },
];

export { publicRoutes };
