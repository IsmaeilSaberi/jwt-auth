"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { RiArrowRightSLine } from "react-icons/ri";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userToNormal } from "@/store/slices/roleSlice";
import { userPhoneConfirmedFalse } from "@/store/slices/phoneConfirmedSlice";
import { useremailConfirmedFalse } from "@/store/slices/emailConfirmedSlice";
import { userLogedTrue } from "@/store/slices/logedSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const RegisterComp = () => {
  const usernameRef = useRef();
  const displaynameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  const [lastError, setLastError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      username: usernameRef.current.value,
      displayname: displaynameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      repassword: repasswordRef.current.value,
      joinedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}new-user`,
                    formData
                  )
                  .then((data) => {
                    dispatch(userToNormal());
                    dispatch(userPhoneConfirmedFalse());
                    dispatch(useremailConfirmedFalse());
                    dispatch(userLogedTrue());
                    Cookies.set("auth_token", data.data.auth_token, {
                      expires: 30,
                    });
                    router.push("/account");
                    toast.success("You registered successfully!");
                  })
                  .catch((err) => {
                    const errMsg = err?.response?.data?.msg
                      ? err.response.data.msg
                      : "error in creating user!";
                    toast.error(errMsg);
                    console.log(err);
                  });
              } else {
                setLastError(
                  <div>
                    <div>repassword: </div>
                    <ul className="flex flex-col gap-2">
                      <li className="flex gap-1">
                        {" "}
                        <RiArrowRightSLine />
                        <span>should be equal to password!</span>
                      </li>
                    </ul>
                  </div>
                );
              }
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
                      <span>
                        should contain only letters(upper and lower case)
                      </span>
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
        } else {
          setLastError(
            <div>
              <div>phone: </div>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-1">
                  {" "}
                  <RiArrowRightSLine />
                  <span>should be 11 numbers</span>
                </li>
                <li className="flex gap-1">
                  {" "}
                  <RiArrowRightSLine />
                  <span>should start with 0</span>
                </li>
              </ul>
            </div>
          );
        }
      } else {
        setLastError(
          <div>
            <div>displayname: </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-1">
                {" "}
                <RiArrowRightSLine />
                <span>should be 8-30 characters long</span>
              </li>
              <li className="flex gap-1">
                {" "}
                <RiArrowRightSLine />
                <span>
                  should be contain only letters(upper and lower case)
                </span>
              </li>
              <li className="flex gap-1">
                {" "}
                <RiArrowRightSLine />
                <span>should be contain only numbers</span>
              </li>
            </ul>
          </div>
        );
      }
    } else {
      setLastError(
        <div>
          <div>username: </div>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1">
              {" "}
              <RiArrowRightSLine />
              <span>should be 8-30 characters long</span>
            </li>
            <li className="flex gap-1">
              {" "}
              <RiArrowRightSLine />
              <span>should be contain only letters(upper and lower case)</span>
            </li>
            <li className="flex gap-1">
              {" "}
              <RiArrowRightSLine />
              <span>should be contain only numbers</span>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8 rounded w-96">
      <div className="flex gap-4">
        <h1 className="text-lg font-bold">Register Page</h1>
        <Link
          className="bg-indigo-400 text-white text-sm rounded px-2 py-1 hover:bg-indigo-600"
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
