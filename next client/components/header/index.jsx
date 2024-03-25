"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {
  useremailConfirmedTrue,
  useremailConfirmedFalse,
} from "@/store/slices/emailConfirmedSlice";
import { userLogedTrue, userLogedFalse } from "@/store/slices/logedSlice";
import {
  userPhoneConfirmedTrue,
  userPhoneConfirmedFalse,
} from "@/store/slices/phoneConfirmedSlice";
import {
  userToLogout,
  userToNormal,
  userToAdmin,
} from "@/store/slices/roleSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [authToken, setauthToken] = useState(Cookies.get("auth_token"));

  const logedValue = useSelector((store) => store.loged.value);
  const emailConfirmedValue = useSelector(
    (store) => store.emailConfirmed.value
  );
  const phoneConfirmedValue = useSelector(
    (store) => store.phoneConfirmed.value
  );
  const roleValue = useSelector((store) => store.role.value);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}cookie-to-user`, {
        headers: { auth_token: authToken },
      })
      .then((data) => {
        // console.log(data.data);
        data.data.data.loged == 1
          ? dispatch(userLogedTrue())
          : dispatch(userLogedFalse());
        data.data.data.email_confirmed == false
          ? dispatch(useremailConfirmedFalse())
          : dispatch(useremailConfirmedTrue());
        data.data.data.phone_confirmed == false
          ? dispatch(userPhoneConfirmedFalse())
          : dispatch(userPhoneConfirmedTrue());
        data.data.data.role == 1
          ? dispatch(userToAdmin())
          : data.data.data.role == 3
          ? dispatch(userToNormal())
          : dispatch(userToLogout());
      })
      .catch((err) => {
        console.log(err.response.data.clearToken);
        err.response.data && err.response.data.clearToken
          ? Cookies.set("auth_token", "", { expires: 0 })
          : console.log("");
        dispatch(userLogedFalse());
        dispatch(useremailConfirmedFalse());
        dispatch(userPhoneConfirmedFalse());
        dispatch(userToLogout());
      });
  }, []);

  return (
    <div className="p-4 text-sm flex gap-2">
      <Link
        href={"/"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Home
      </Link>
      <Link
        href={"/login"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Login
      </Link>
      <Link
        href={"/register"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Register
      </Link>
      <Link
        href={"/account"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Account
      </Link>
      <Link
        href={"/admin-pannel"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Admin Pannel
      </Link>
    </div>
  );
};

export default Header;
