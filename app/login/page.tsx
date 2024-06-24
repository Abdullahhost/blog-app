"use client";

import React, { useCallback, useState } from "react";
import "./index.css";
import Input from "./components/Input";
import Button from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

type VariantProps = "LOGIN" | "REGISTER";

type UserType = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const page = () => {
  const [variant, setVariant] = useState<VariantProps>("LOGIN");

  const [userData, setUserData] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (variant === "REGISTER") {
      const { confirm_password, ...user } = userData;
      if (userData.password === userData.confirm_password) {
        axios
          .post("/api/register", user)
          .then((data) => {
            if (data.status === 201) {
              toast.success("User Create Successfully. Now click Submit button again to login");
              setVariant("LOGIN")
            } else {
              toast.success("Chelck Again your credentials")
            }
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        toast.error("Both Password not matched!");
      }
    }

    if (variant === "LOGIN") {
      try {
        await signIn("credentials", {
          email: userData.email,
          password: userData.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
            console.log(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In!");
            router.push("/");
          }
        });
      } catch (err) {
        console.log("There is the error", err);
      }
    }
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged In!");
        }
      })
  };

  return (
    <>
      <div className="h-full flex">
        <div className=" w-full lg:w-2/4 overflow-y-scroll h-screen p-8 md:px-28 ">
          <div className="w-full flex flex-col items-center ">
            <h2 className="text-[3rem] text-pink-300 font-semibold  py-2 font-[cursive]  leading-3 pt-[5rem]">
              Bloogitu
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
              <h3 className="text-[#333438] font-bold text-3xl py-6">
                {variant === "LOGIN" ? "Login" : "Register"}
              </h3>

              <div className="w-full py-2">
                <label
                  className="text-[16px] text-[#67748E] font-light setTextStyle"
                  htmlFor="first Name"
                >
                  Name
                </label>
                <Input
                  name={"name"}
                  type={"text"}
                  placeholder="Enter your Name"
                  fullwidth
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="w-full py-2">
                <label
                  htmlFor="Email"
                  className="text-[16px] text-[#67748E] font-light setTextStyle"
                >
                  Email
                </label>
                <Input
                  onChange={(e) => handleChange(e)}
                  name={"email"}
                  type={"email"}
                  placeholder="Enter Email"
                  fullwidth
                />
              </div>
              <div className="w-full py-2 relative">
                <label
                  htmlFor="Password"
                  className="text-[16px] text-[#67748E] font-light setTextStyle"
                >
                  Password
                </label>
                <Input
                  onChange={(e) => handleChange(e)}
                  name={"password"}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  fullwidth
                />
                <div className=" absolute top-12 right-5">
                  {showPassword ? (
                    <>
                      <BsEyeSlash
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </>
                  ) : (
                    <>
                      <BsEye
                        size={20}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </>
                  )}
                </div>
              </div>

              {variant === "REGISTER" ? (
                <>
                  <div className="w-full py-2 relative">
                    <label
                      htmlFor="Password"
                      className="text-[16px] text-[#67748E] font-light setTextStyle"
                    >
                      Confirm password
                    </label>
                    <Input
                      name="confirm_password"
                      onChange={(e) => handleChange(e)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      fullwidth
                    />

                    <div className=" absolute top-12 right-5">
                      {showPassword ? (
                        <>
                          <BsEyeSlash
                            size={20}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </>
                      ) : (
                        <>
                          <BsEye
                            size={20}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="w-full mt-6">
                <Button type={"submit"} fullWidth secondary>
                  Submit
                </Button>
              </div>
            </form>
          </div>

          <div className="relative my-4">
            <div
              className="
                            absolute
                            inset-0 
                            flex
                            items-center
                        "
            >
              <div
                className="
                            w-full
                            border-t 
                            border-gray-300 
                            "
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-50 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="text-center my-6">

            <Button type={"submit"} fullWidth onClick={() => socialAction("google")}>
              Google
            </Button>
          </div>


          <div className="flex gap-3 mt-6 items-center">
            {variant === "LOGIN" ? (
              <>
                <h3> Don't have an account ?</h3>
                <button
                  className="bg-slate-100 px-3 py-2 rounded-2xl border-r-4 border-l-4 active:bg-slate-200 active:border-l-4 "
                  onClick={toggleVariant}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                <h3>Already have an account ➡ </h3>
                <button
                  className="bg-slate-100 px-3 py-2 rounded-2xl border-r-4 border-l-4 active:bg-slate-200 active:border-l-4 "
                  onClick={toggleVariant}
                >
                  login page
                </button>
              </>
            )}
          </div>
        </div>
        <div className="bgImage hidden lg:block"></div>
      </div>
    </>
  );
};

export default page;
