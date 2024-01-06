"use client";
import { useSelector, useDispatch } from "react-redux";
import { userLogedFalse, userLogedTrue } from "@/store/slices/logedSlice";
import { toast } from "react-toastify";

const LoginComp = () => {
  const logedVal = useSelector((store) => store.loged.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div>value: {logedVal}</div>
      <div>
        <button
          onClick={() => {
            dispatch(userLogedTrue());
            toast.success("every thing is ok!");
          }}
          className="text-lg text-green-500 p-2 border-2 border-red-500 rounded"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(userLogedFalse())}
          className="text-lg text-green-500 p-2 border-2 border-red-500 rounded"
        >
          -1
        </button>
      </div>
    </div>
  );
};

export default LoginComp;
