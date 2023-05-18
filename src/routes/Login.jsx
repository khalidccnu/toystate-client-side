import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import bnLogin from "../assets/bn-login.png";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeInput = ({ target }) => {
    const { name, value } = target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLoginWithEP = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-sky-50 max-w-fit md:max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-6 rounded-2xl text-sm">
          <div className="max-w-xs">
            <img src={bnLogin} alt="" />
          </div>
          <form className="form-control space-y-4" onSubmit={handleLoginWithEP}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              className="input input-sm bg-transparent text-[#35bef0] w-full px-0 border-0 border-b border-b-[#35bef0] rounded-none focus:outline-0"
              onChange={changeInput}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              className="input input-sm bg-transparent text-[#35bef0] w-full px-0 border-0 border-b border-b-[#35bef0] rounded-none focus:outline-0"
              onChange={changeInput}
            />
            <button
              type="submit"
              className="btn btn-sm bg-[#35bef0] border-none rounded normal-case w-full"
            >
              Login
            </button>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
              <span>New to ToyState?</span>
              <Link to="/signup" className="text-[#35bef0]">
                Create New Account
              </Link>
            </div>
            <div className="divider">or</div>
            <div className="flex justify-center items-center p-2 border hover:text-[#35bef0] cursor-pointer space-x-2 transition-[color] duration-500">
              <FaGoogle className="text-xl" />
              <span>Continue with Google</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
