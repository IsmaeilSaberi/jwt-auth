"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const ProductBox = () => {
  const [authToken, setauthToken] = useState(Cookies.get("auth_token"));

  const logedValue = useSelector((store) => store.loged.value);
  const emailConfirmedValue = useSelector(
    (store) => store.emailConfirmed.value
  );
  const phoneConfirmedValue = useSelector(
    (store) => store.phoneConfirmed.value
  );

  const submitter = () => {
    const formData = {
      product_id: "1234",
    };
    if (logedValue == -1) {
      toast.error("please login!");
    } else {
      if (emailConfirmedValue == -1) {
        toast.error("please confirm your email!");
      } else {
        if (phoneConfirmedValue == -1) {
          toast.error("please confirm your phone!");
        } else {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}add-to-cart`,
              formData,
              {
                headers: { auth_token: authToken },
              }
            )
            .then((data) => {
              const msg = data.data?.msg
                ? data.data.msg
                : "successfully added to cart!";
              toast.success(msg);
            })
            .catch((err) => {
              console.log(err);
              const errorMsg = err.response?.data?.msg
                ? err.response.data.msg
                : "Error";
              toast.error(errorMsg);
            });
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-md p-3 border-2 border-red-400">
      <div className="flex justify-center">
        <Image
          className="rounded-md"
          src={"/book.avif"}
          width={200}
          height={100}
          alt="image"
        />
      </div>
      <h3>This is product box</h3>
      <button
        onClick={submitter}
        className="bg-blue-500 transition-all duration-200 hover:bg-blue-700"
      >
        add to cart
      </button>
    </div>
  );
};
export default ProductBox;
