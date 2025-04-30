import { Link } from "react-router-dom";
import images from "../../assets/img";
import BackButton from "../../components/BackButton";
import "../Signup/Signup.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Signup() {
  const [optionstate, setOptionstate] = useState();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [username, setUsername] = useState(""); // Đổi từ email -> username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Thêm confirm password

  useEffect(() => {}, [optionstate]);

  const ShowOptions = () => {
    optionstate ? setOptionstate(false) : setOptionstate(true);
  };

  const RenderOptions = () => {
    if (optionstate) {
      return (
        <>
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
            <img
              src={images.twitter}
              alt=""
              className="h-[20px] w-[20px] object-cover"
            />
            <div className="text-sm font-medium">Continue with X</div>
            <div className=""></div>
          </Link>
        </>
      );
    } else {
      return (
        <div className="custom-hover relative">
          <button
            className="custom-hover mt-8 text-sm font-medium"
            onClick={ShowOptions}
          >
            MORE OPTIONS
          </button>
        </div>
      );
    }
  };

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username: username,
          password: password,
        }
      );

      if (response.data) {
        alert("Account created successfully!");
        setShowEmailForm(false);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center px-28">
      <div className="relative flex h-[80px] w-full items-center justify-between py-4">
        <div className="-translate-x-24 md:translate-x-0">
          <BackButton />
        </div>
        <div className="custom-hover relative translate-x-14 md:translate-x-0">
          <Link to={"/login"} className="custom-hover py-2 font-medium">
            LOG IN
          </Link>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] w-full min-w-[320px] max-w-[360px] flex-col items-center justify-evenly">
        <div className="text-2xl font-bold">Create Your Account</div>

        <div className="text-center text-sm text-zinc-400">
          By creating an account, you agree to our{" "}
          <Link className="underline">Terms of Service</Link> and have read and
          understood the <Link className="underline">Privacy Policy</Link>.
        </div>

        <div className="flex w-full flex-col items-center">
          <Link className="flex w-full justify-between border border-black p-5">
            <img
              src={images.google}
              alt=""
              className="h-[20px] w-[20px] object-cover"
            />
            <div className="text-sm font-medium">Continue with Google</div>
            <div className=""></div>
          </Link>

          <button
            onClick={handleEmailClick}
            className="mt-4 flex w-full justify-between border border-black p-5"
          >
            <i className="fa-regular fa-envelope text-[20px]"></i>
            <div className="text-sm font-medium">Continue with Username</div>
            <div className=""></div>
          </button>

          {RenderOptions()}

          {showEmailForm && (
            <div className="mt-4 w-full">
              <input
                type="text"
                placeholder="Username"
                className="mb-2 w-full border p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-2 w-full border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-2 w-full border p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={handleSignup}
                className="w-full bg-black p-2 text-white"
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        <div className="custom-hover text-center text-xs text-zinc-400">
          Secure Login with reCAPTCHA subject to Google
        </div>
      </div>
    </div>
  );
}

export default Signup;
