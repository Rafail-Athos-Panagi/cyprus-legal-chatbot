"use client";

import { BiErrorCircle } from "react-icons/bi";
import { validEmail } from "../regex/Regex";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { SEND_FORGET_PASSWORD_REQUEST } from "@/app/api/auth/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "@/app/context/UserContext";

const ForgetPassword = () => {
  const { isGreek } = useUserContext();
  const [forgetEmailValue, setForgetEmailValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [forgotEmailHasError, setForgetEmailHasError] =
    useState<boolean>(false);
  const [forgotEmailError, setForgetEmailError] = useState<string>(
    `${
      isGreek
        ? "Η ηλεκτρονική διεύθυνση δεν είναι καταχωρημένη"
        : "The email is not registered"
    }`
  );

  const inputClasses =
    "block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-1 border-gray-500 text-gray-700 focus:border-sky-500  focus:ring-sky-500 ring-grey-700 dark:bg-light dark:text-white";

  const sendForgotPasswordHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (forgetEmailValue.trim() !== "" && validEmail.test(forgetEmailValue)) {
      const res: any = await SEND_FORGET_PASSWORD_REQUEST(forgetEmailValue);
      if (res.status === 429) {
        setForgetEmailError(
          `${
            isGreek
              ? "Πάρα πολλές προσπάθειες. Προσπαθήστε ξανά αργότερα"
              : "Too many attempts. Please try again later"
          }`
        );
        setTimeout(() => {
          setLoading(false);
          setForgetEmailHasError(true);
        }, 2000);
      } else if (res.status !== 200) {
        setForgetEmailError(
          `${
            isGreek
              ? "Η ηλεκτρονική διεύθυνση δεν είναι καταχωρημένη"
              : "The email is not registered"
          }`
        );
        setTimeout(() => {
          setLoading(false);
          setForgetEmailHasError(true);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setForgetEmailHasError(false);
        }, 2000);
        toast.success("Email has been sent", {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setForgetEmailError(
        `${
          isGreek
            ? "Η ηλεκτρονική διεύθυνση δεν είναι καταχωρημένη"
            : "The email is not registered"
        }`
      );
      setTimeout(() => {
        setLoading(false);
        setForgetEmailHasError(true);
      }, 2000);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="light"
      />
      <div className="flex flex-col items-center justify-center min-h-86vh h-full dark:bg-light">
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md dark:bg-very_dark">
          <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
            {isGreek
              ? "Αποστολή Αιτήματος Νέου Κωδικού Πρόσβασης"
              : "Send New Password Request"}
          </h1>

          <form className="mt-6" onSubmit={sendForgotPasswordHandler}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 dark:text-white"
                id="email"
              >
                {isGreek ? "Ηλεκτρονική Διεύθυνση" : "Email"}
              </label>
              <input
                type="email"
                className={inputClasses}
                value={forgetEmailValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setForgetEmailValue(e.target.value);
                }}
              />
              {forgotEmailHasError && (
                <div className="flex px-4 py-2 text-pink-600 font-bold">
                  <BiErrorCircle />
                  <p className="text-xs px-2">{forgotEmailError}</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="submit"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  {loading && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-4"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">{`${
                        isGreek ? "Φόρτωση..." : "Loading..."
                      }`}</span>
                    </div>
                  )}

                  {loading
                    ? isGreek
                      ? "Αποστολή Αιτήματος..."
                      : "Sending Request..."
                    : isGreek
                    ? "Αποστολή Αιτήματος"
                    : "Send Request"}
                </div>
              </button>
              <Link href="/login" className="font-medium text-blue-800">
                <div className="flex items-center justify-items-start pt-4">
                  <HiArrowLeft size={20} />
                  <p className="pl-2">{`${
                    isGreek ? "Πίσω στην σύνδεση" : "Back To Log In"
                  }`}</p>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
