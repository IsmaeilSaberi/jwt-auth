"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

// ?   displayname:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/
// ?   username:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/
// ?   email:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
// ?   phone:  /^[0][0-9]{10}$/
// ?   password:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/

const RegisterComp = () => {
  const usernameRef = useRef();
  const displaynameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  const [lastError, setLastError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      username: usernameRef.current.value,
      displayname: displaynameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      repassword: repasswordRef.current.value,
    };

    // USERNAME REGEX
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/.test(formData.username)
    ) {
      // DISPLAYNAME REGEX
      if (
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/.test(
          formData.displayname
        )
      ) {
        //  PHONE REGEX
        if (/^[0][0-9]{10}$/.test(formData.phone)) {
          // EMAIL REGEX
          if (
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              formData.email
            )
          ) {
            // PASSWORD REGEX
            if (
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/.test(
                formData.password
              )
            ) {
              // REPASSWORD REGEX
              if (formData.password == formData.repassword) {
                setLastError("");
                toast.info("please wait ...!");
              }
            } else {
              setLastError("*. password and repassword should be the same!");
            }
          } else {
            setLastError("*. email structure is incorrect!");
          }
        } else {
          setLastError("*. phone should be 11 numbers and start with 0!");
        }
      } else {
        setLastError(
          "*. displayname should be 8-30 characters long and contain only letters(upper and lower case) and numbers!"
        );
      }
    } else {
      setLastError(
        "*. username should be 8-30 characters long and contain only letters(upper and lower case) and numbers!"
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8 rounded w-96">
      <div className="flex gap-4">
        <h1 className="text-lg font-bold">Register Page</h1>
        <Link
          className="bg-indigo-400 text-white text-sm rounded px-2 py-1"
          href={"/login"}
        >
          login
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
          ref={usernameRef}
          placeholder="username"
          className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
          type="text"
        />
        <input
          ref={displaynameRef}
          placeholder="displayname"
          className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
          type="text"
        />
        <input
          ref={phoneRef}
          placeholder="09 - - - - - - - - -"
          className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
          type="text"
        />
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
        <input
          ref={repasswordRef}
          placeholder="repassword"
          className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
          type="password"
        />
        <button
          className="py-1 px-2 w-full cursor-pointer rounded border-2 border-red-500 bg-green-500 text-white hover:border-red-700"
          type="submit"
        >
          register
        </button>
      </form>
    </div>
  );
};

export default RegisterComp;
