import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/img";
import { useState, useEffect } from "react";

function Navbar(props) {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    ScrollHandle();
  }, [menu]);

  useEffect(() => {
    // Listen for storage changes (in case you want cross-tab sync)
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Initial run in case of update from same tab

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function logout() {
    localStorage.removeItem("user");
    setUser(null); // cập nhật lại state
    navigate("/");
  }

  const HandleMenuOnclick = () => {
    setMenu(!menu);
  };

  const ScrollHandle = () => {
    const navbar = document.getElementById("mynav");
    if (navbar) {
      window.onscroll = () => {
        if (window.scrollY > window.innerHeight - 80) {
          navbar.classList.add("shadow-md", "border-b", "border-[#0c0c0c]");
        } else {
          navbar.classList.remove("shadow-md", "border-b", "border-[#0c0c0c]");
        }
      };
    }
  };

  const RenderNavbar = () => {
    const username = user?.user?.username;

    return (
      <div
        id="mynav"
        className={`${
          props.variant === "about"
            ? "fixed"
            : "sticky border-b bg-[#fafafa] shadow"
        } top-0 left-0 right-0 z-50 flex h-[80px] items-center justify-between px-4 md:px-12 lg:px-28`}
      >
        <Link className="w-28" to="/">
          <img
            src={
              props.variant === "about" ? images.logoFullwhite : images.logoFull
            }
            alt="logo.png"
          />
        </Link>

        <div
          className={`hidden items-center font-semibold ${
            props.variant === "about" ? "text-white" : "text-black"
          } lg:flex`}
        >
          <Link to="/" className="mr-2 px-4 py-3">
            Home
          </Link>
          <Link to="/about" className="mr-2 px-4 py-3">
            About
          </Link>
          <Link to="/product" className="mr-2 px-4 py-3">
            Product
          </Link>
          <Link to="/calculator" className="mr-2 px-4 py-3">
            Calculator
          </Link>
          <Link to="/weight-logs" className="mr-2 px-4 py-3">
            Weight Logs
          </Link>
          <Link to="/contact" className="px-4 py-3">
            Contact
          </Link>
        </div>

        <div className="text-md hidden lg:block">
          {username ? (
            <div
              className={`text-sm ${
                props.variant === "about" ? "text-white" : "text-black"
              }`}
            >
              Logged in as <span className="font-medium">{username}</span>,{" "}
              <button
                onClick={logout}
                className="p-2 font-semibold text-red-600"
              >
                Logout?
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="mr-4 rounded-3xl border-2 border-blue-500 bg-inherit py-2 px-6 font-bold text-blue-500 shadow-sm duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="rounded-3xl border-2 border-transparent px-6 py-2 font-bold text-blue-500 duration-300 ease-in-out hover:border-[#f3f5f9] hover:bg-[#f3f5f9]"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="flex h-full items-center lg:hidden">
          <button onClick={HandleMenuOnclick}>
            <i
              className={`fa-solid fa-bars p-4 text-xl ${
                props.variant === "about" ? "text-white" : "text-black"
              }`}
            ></i>
          </button>
          {RenderMenu(username)}
        </div>
      </div>
    );
  };

  const RenderMenu = (username) => {
    if (!menu) return null;

    return (
      <div className="absolute right-0 top-full flex w-screen flex-col border bg-[#fafafa] shadow">
        <Link to="/" className="w-full border border-zinc-100 py-4 text-center">
          Home
        </Link>
        <Link
          to="/about"
          className="w-full border border-zinc-100 py-4 text-center"
        >
          About
        </Link>
        <Link
          to="/product"
          className="w-full border border-zinc-100 py-4 text-center"
        >
          Product
        </Link>
        <Link
          to="/calculator"
          className="w-full border border-zinc-100 py-4 text-center"
        >
          Calculator
        </Link>
        <Link
          to="/weight-logs"
          className="w-full border border-zinc-100 py-4 text-center"
        >
          Weight Logs
        </Link>
        <Link
          to="/contact"
          className="w-full border border-zinc-100 py-4 text-center"
        >
          Contact
        </Link>
        {username ? (
          <button
            onClick={logout}
            className="w-full border border-zinc-100 py-4 text-center font-semibold text-red-500"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/signup"
              className="w-full border border-zinc-100 py-4 text-center underline"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="w-full border border-zinc-100 py-4 text-center underline"
            >
              Login
            </Link>
          </>
        )}
      </div>
    );
  };

  return RenderNavbar();
}

export default Navbar;
