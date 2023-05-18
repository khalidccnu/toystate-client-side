import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLink, FaUser, FaUserSecret } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider.jsx";
import ptSignup from "../assets/pt-signup.png";

const Signup = () => {
  const { createUserWithEP } = useContext(AuthContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    purl: "",
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const changeInput = ({ target }) => {
    const { name, value } = target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, purl } = e.target;

    createUserWithEP(name.value, email.value, password.value, purl.value)
      .then((_) =>
        setSuccess(
          "Your account has been created successfully! You are being redirected, please wait..."
        )
      )
      .then((_) => setTimeout((_) => navigate("/dashboard"), 3000));
  };

  return (
    <section>
      <img src={ptSignup} alt="" className="fixed h-full -z-10" />
      <div className="container">
        <div className="flex justify-center items-center min-h-screen pt-20 pb-10">
          <div className="absolute top-5 right-5">
            <button
              type="button"
              className="btn btn-sm md:bg-[#35bef0] border-none rounded normal-case"
              onClick={(_) => navigate("/login")}
            >
              Login
            </button>
          </div>
          <form
            className="form-control basis-80 space-y-4"
            onSubmit={handleSignup}
          >
            {success ? (
              <span className="text-xs font-medium text-neutral md:text-[#35bef0]">
                {success}
              </span>
            ) : null}
            <label className="input-group">
              <span className="border border-r-0 border-gray-300">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={input.name}
                className="input input-sm input-bordered focus:outline-0 w-full"
                onChange={changeInput}
              />
            </label>
            <label className="input-group">
              <span className="border border-r-0 border-gray-300">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                className="input input-sm input-bordered focus:outline-0 w-full"
                onChange={changeInput}
              />
            </label>
            <label className="input-group">
              <span className="border border-r-0 border-gray-300">
                <FaUserSecret />
              </span>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                className="input input-sm input-bordered focus:outline-0 w-full"
                onChange={changeInput}
              />
            </label>
            <label className="input-group">
              <span className="border border-r-0 border-gray-300">
                <FaLink />
              </span>
              <input
                type="text"
                placeholder="Photo URL"
                name="purl"
                value={input.purl}
                className="input input-sm input-bordered focus:outline-0 w-full"
                onChange={changeInput}
              />
            </label>
            <button
              type="submit"
              className="btn btn-sm md:bg-[#35bef0] border-none rounded-lg normal-case w-full"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
