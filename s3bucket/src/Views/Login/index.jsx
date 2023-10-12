import React, { useState } from "react";
import { Input, Button, Loader } from "../../components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { login, add_user } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message, errors } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login({ userData }));
  };
  const showPas = () => {
    setShowPassword(!showPassword);
  };
  const handleSignup = () => {
    const userData = {
      username,
      password,
    };
    dispatch(add_user({ userData }));
  };
  return (
    <div className="h-screen w-full font-mont flex justify-center items-center">
      <div className="w-full h-screen bg-[#FCC81C] !text-center hidden md:flex justify-center"></div>
      <div className="w-full md:w-[600px] max-w-[95%] bg-white flex flex-col justify-  p-4  text-black h-screen">
        <div className="flex w-full !mb-2"></div>
        <div className="my-16 text-black text-left">
          <h1 className="text-3xl font-bold">Hi, Welcome Back!</h1>
          <h5 className="text-sm text-[#aaa]">
            Logical Customer Relation Manager Solution
          </h5>
        </div>
        <form onSubmit={submitHandler} className="mb-10">
          <div className="relative">
            <label className="mb-1">Username</label>
            <Input
              id="email"
              placeholder="Username"
              className="bg-white text-[#38015c] border border-[#d7d7d7] w-[98%] text-left py-3 px-2.5 h-[60px]"
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
              name="username"
              errors={errors}
            />
            <div className="absolute top-11 right-3.7 text-lg text-[#7c7f82]">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
          </div>
          <div className="relative mt-2">
            <label className="mb-1">Password</label>
            <Input
              placeholder="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-white text-[#38015c] border border-[#d7d7d7] w-[98%] text-left py-3 px-2.5 h-[60px]"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              name="password"
              errors={errors}
            />
            <div className="absolute top-11 right-3.7 text-lg text-[#7c7f82]">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
          </div>
          {isError && !errors && (
            <div className="text-[#f00] text-sm mb-3.7 mt-1.5">{message}</div>
          )}

          <div className="text-black mb-6 flex justify-between mt-1.5 px-2.5">
            <div className="cursor-pointer">
              <input
                type="checkbox"
                id="showpass"
                name="showpass"
                value={showPassword}
                onChange={showPas}
                className="cursor-pointer"
              />
              <label htmlFor="showpass" className="ml-2 cursor-pointer">
                Show Password
              </label>
            </div>
          </div>
          <div className="">
            {!isLoading && (
              <>
                <Button
                  text="Login"
                  type="submit"
                  className="!w-full !rounded-lg bg-primary-100 text-white cursor-pointer !p-4 text-xl font-normal uppercase w-[98%] border border-primary-100"
                />
                <Button
                  text="Signup"
                  type="button"
                  className="!w-full !rounded-lg bg-white text-primary-100 border border-primary-100 mt-2 cursor-pointer !p-4 text-xl font-normal uppercase w-[98%]"
                  onClick={handleSignup}
                />
              </>
            )}

            {isLoading && <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
