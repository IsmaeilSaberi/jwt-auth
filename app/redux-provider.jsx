"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastContainer } from "react-toastify";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        bodyClassName={() =>
          "font-[estedad] text-sm flex justify-center items-center gap-2"
        }
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        // rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Provider>
  );
};

export default ReduxProvider;
