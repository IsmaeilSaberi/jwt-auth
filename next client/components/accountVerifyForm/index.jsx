"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { useremailConfirmedFalse } from "@/store/slices/emailConfirmedSlice";
import { userLogedFalse } from "@/store/slices/logedSlice";
import { userPhoneConfirmedFalse } from "@/store/slices/phoneConfirmedSlice";
import { userToLogout } from "@/store/slices/roleSlice";
import { useDispatch } from "react-redux";

const AccountVerifyForms = () => {
  const [authToken, setauthToken] = useState(Cookies.get("auth_token"));

  const [logoutState, setlogoutState] = useState(-1);
  const router = useRouter();
  const dispatch = useDispatch();

  const emailVerifyCodeRef = useRef();
  const phoneVerifyCodeRef = useRef();

  const sendVerifyEmail = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}send-register-email`, {
        headers: { auth_token: authToken },
      })
      .then((data) => {
        const msg = data.data ? data.data.msg : "email sended";
        toast.success(msg);
      })
      .catch((err) => {
        const msg =
          err.response && err.response.data
            ? err.response.data
            : "error happend";
        toast.error(msg);
      });
  };

  const sendVerifyPhone = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}send-register-phone`, {
        headers: { auth_token: authToken },
      })
      .then((data) => {
        const msg = data.data ? data.data.msg : "phone message sended";
        toast.success(msg);
      })
      .catch((err) => {
        const msg =
          err.response && err.response.data
            ? err.response.data
            : "error happend";
        toast.error(msg);
      });
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    const formData = {
      emailCode: emailVerifyCodeRef.current.value,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}confirm-user-email`,
        formData,
        {
          headers: { auth_token: authToken },
        }
      )
      .then((data) => {
        const msg = data.data ? data.data.msg : "your email is active now!";
        toast.success(msg);
        emailVerifyCodeRef.current.value = "";
      })
      .catch((err) => {
        const msg =
          err.response && err.response.data
            ? err.response.data.msg
            : "code is wrong!";
        toast.error(msg);
      });
  };

  const verifyPhone = (e) => {
    e.preventDefault();
    const formData = {
      phoneCode: phoneVerifyCodeRef.current.value,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}confirm-user-phone`,
        formData,
        {
          headers: { auth_token: authToken },
        }
      )
      .then((data) => {
        const msg = data.data ? data.data.msg : "your phone is active now!";
        toast.success(msg);
        phoneVerifyCodeRef.current.value = "";
      })
      .catch((err) => {
        const msg =
          err.response && err.response.data
            ? err.response.data.msg
            : "code is wrong!";
        toast.error(msg);
      });
  };

  const logouter = () => {
    Cookies.set("auth_token", "", { expires: 0 });
    setlogoutState(1);
  };

  useEffect(() => {
    if (logoutState == 1) {
      router.push("/login");
      dispatch(userLogedFalse());
      dispatch(useremailConfirmedFalse());
      dispatch(userPhoneConfirmedFalse());
      dispatch(userToLogout());
    }
  }, [logoutState]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-20 w-full p-8">
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
              onClick={() => sendVerifyPhone()}
              className="bg-blue-500 transition-all duration-200 hover:bg-blue-600 rounded text-sm text-white p-1"
            >
              send phone message
            </button>
          </div>
          <form
            onSubmit={verifyPhone}
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
      <div className="flex justify-start items-center p-8">
        <button
          onClick={() => logouter()}
          className="bg-rose-600 rounded text-white transition-all duration-200 hover:bg-rose-700 p-2"
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default AccountVerifyForms;
