"use client";
import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AccountVerifyForms = () => {
  const [authToken, setauthToken] = useState(Cookies.get("auth_token"));

  const emailVerifyCodeRef = useRef();
  const phoneVerifyCodeRef = useRef();

  const verifyEmail = () => {
    const formData = {
      code: emailVerifyCodeRef.current.value,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}`, formData, {
        headers: { auth_token: authToken },
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendVerifyEmail = () => {};

  const verifyPhoneMessage = () => {
    const formData = {
      code: phoneVerifyCodeRef.current.value,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}`, formData, {
        headers: { auth_token: authToken },
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendVerifyPhoneMsg = () => {};

  return (
    <div className="flex justify-between items-start gap-20 w-full p-8">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-center items-center gap-4">
          <h3>verify email</h3>
          <button
            onClick={() => sendVerifyEmail()}
            className="bg-blue-500 transition-all duration-200 hover:bg-blue-600 rounded text-sm text-white p-1"
          >
            send email
          </button>
        </div>
        <form
          onSubmit={verifyEmail}
          className="flex flex-col gap-4 justify-center items-center bg-indigo-200 border-2 rounded  w-full border-red-500 p-4"
        >
          <input
            ref={emailVerifyCodeRef}
            placeholder="email verify code"
            className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
            type="text"
          />
          <button
            className="py-1 px-2 w-full cursor-pointer rounded border-2 border-red-500 bg-green-500 text-white hover:border-red-700"
            type="submit"
          >
            verify my email
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-center items-center gap-4">
          <h3>verify phone</h3>
          <button
            onClick={() => sendVerifyPhoneMsg()}
            className="bg-blue-500 transition-all duration-200 hover:bg-blue-600 rounded text-sm text-white p-1"
          >
            send phone message
          </button>
        </div>
        <form
          onSubmit={verifyPhoneMessage}
          className="flex flex-col gap-4 justify-center items-center bg-indigo-200 border-2 rounded  w-full border-red-500 p-4"
        >
          <input
            ref={phoneVerifyCodeRef}
            placeholder="phone verify code"
            className="p-1 rounded border-2 w-full border-transparent outline-none focus:border-indigo-600"
            type="text"
          />
          <button
            className="py-1 px-2 w-full cursor-pointer rounded border-2 border-red-500 bg-green-500 text-white hover:border-red-700"
            type="submit"
          >
            verify my phone
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountVerifyForms;
