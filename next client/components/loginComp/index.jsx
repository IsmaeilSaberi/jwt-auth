"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { toast } from "react-toastify";

const LoginComp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [lastError, setLastError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // EMAIL REGEX
    if (
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.email)
    ) {
      // PASSWORD REGEX
      if (
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(
          formData.password
        )
      ) {
        setLastError("");
        toast.success("login successfull ...!");
      } else {
        setLastError(
          <div>
            <div>password: </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-1">
                {" "}
                <RiArrowRightSLine />
                <span>should be 8-24 characters long</span>
              </li>
              <li className="flex gap-1">
                {" "}
                <RiArrowRightSLine />
                <span>should contain only letters(upper and lower case)</span>
              </li>
              <li className="flex gap-1">
                {" "}
                <RiArrowRightSLine />
                <span>should contain only numbers</span>
              </li>
            </ul>
          </div>
        );
      }
    } else {
      setLastError(
        <div>
          <div>email: </div>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1">
              {" "}
              <RiArrowRightSLine />
              <span>structure is incorrect!</span>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8 rounded w-96">
      <div className="flex gap-4">
        <h1 className="text-lg font-bold">Login Page</h1>
        <Link
          className="bg-indigo-400 text-white text-sm rounded px-2 py-1 hover:bg-indigo-600"
          href={"/register"}
        >
          register
        </Link>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 justify-center items-center bg-indigo-200 border-2 rounded  w-full border-red-500 p-4"
      >
        {lastError == "" ? (
          <div></div>
        ) : (
          <div className="p-1 w-full text-red-600 text-sm text-bold">
            {lastError}
          </div>
        )}

        <input
          ref={emailRef}
          placeholder="email"
          className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
          type="email"
        />
        <input
          ref={passwordRef}
          placeholder="password"
          className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
          type="password"
        />

        <button
          className="py-1 px-2 w-full cursor-pointer rounded border-2 border-red-500 bg-green-500 text-white hover:border-red-700"
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginComp;
