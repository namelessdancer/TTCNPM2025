import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/img";
import BackButton from "../../components/BackButton";
import "../Login/Login.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState(""); // đổi từ email thành username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      navigate("/");
    }
  }, [navigate]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      // Lưu username vào localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      setError(false);
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );

      // ✅ Hiển thị lỗi cụ thể nếu có
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 md:h-screen lg:px-28">
      <div className="relative flex h-[80px] w-full items-center justify-between py-4">
        <BackButton />
        <div className="custom-hover relative -translate-x-8 md:translate-x-0">
          <Link to={"/signup"} className="custom-hover py-2 font-medium ">
            SIGN UP
          </Link>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-evenly lg:px-24">
        <div className="mb-4 text-2xl font-bold">Login into Foodlens</div>
        <div className="flex w-full flex-col justify-between md:flex-row">
          {/* LOGIN */}
          <form onSubmit={handleSubmit} className="flex-1 p-2">
            <div className="">
              <label
                htmlFor="username"
                className="text-xs font-bold text-zinc-500"
              >
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onKeyDown={handleKeyDown}
                onChange={handleUsernameChange}
                className={`mb-4 w-full border-b ${
                  error ? "border-red-500 bg-red-100" : "border-zinc-300"
                } bg-inherit pt-3 pb-5 focus:border-zinc-600 focus:outline-none`}
                placeholder="Your username"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="text-xs font-bold text-zinc-500"
              >
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={handlePasswordChange}
                className={`mb-8 w-full border-b ${
                  error ? "border-red-500 bg-red-100" : "border-zinc-300"
                } bg-inherit pr-8 pt-3 pb-5 focus:border-zinc-600 focus:outline-none`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute bottom-1/2 right-1 translate-y-2 rounded-full p-1 hover:bg-zinc-300"
              >
                {/* Icon ẩn hiện pass, chưa làm chức năng */}
                <i className="fa-solid fa-eye w-6"></i>
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-black py-4 text-sm font-semibold text-white duration-300 ease-in-out hover:opacity-80"
            >
              LOG IN
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-1 flex h-full flex-col items-center">
            <div className="hidden h-full w-[1px] bg-zinc-300 md:block"></div>
            <div className="px-8 py-2 text-xs font-bold text-zinc-500">OR</div>
            <div className="hidden h-full w-[1px] bg-zinc-300 md:block"></div>
          </div>

          {/* OTHER OPTIONS */}
          <div className="flex h-full flex-1 flex-col justify-center px-2 md:px-0">
            <Link className="flex w-full justify-between border border-black p-5">
              <img
                src={images.google}
                alt=""
                className="h-[20px] w-[20px] object-cover"
              />
              <div className="text-sm font-medium">Continue with Google</div>
              <div className=""></div>
            </Link>
            <Link className="mt-4 flex w-full justify-between border border-black p-5">
              <img
                src={images.facebook}
                alt=""
                className="h-[20px] w-[20px] object-cover"
              />
              <div className="text-sm font-medium">Continue with Facebook</div>
              <div className=""></div>
            </Link>
            <Link className="mt-4 flex w-full justify-between border border-black p-5">
              <i className="fa-regular fa-envelope text-[20px]"></i>
              <div className="text-sm font-medium">Continue with Email</div>
              <div className=""></div>
            </Link>
          </div>
        </div>

        <div className="custom-hover relative mt-4">
          <button className="custom-hover text-center text-sm font-semibold">
            CAN'T LOG IN?
          </button>
        </div>
        <div className="custom-hover mb-4 text-center text-sm text-zinc-400">
          Secure Login with reCAPTCHA subject to Google
        </div>
      </div>
    </div>
  );
}

export default Login;
