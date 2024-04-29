"use client";

import Link from "next/link";
import InputFieldCode from "../input-field/InputFieldCode";
import { BiErrorCircle } from "react-icons/bi";
import useInput from "@/app/hooks/user-input";
import { HiArrowLeft } from "react-icons/hi";
import { useUserContext } from "@/app/context/UserContext";
import {
  ACTIVATE_ACCOUNT,
  SEND_NEW_ACTIVATION_CODE,
} from "@/app/api/auth/auth";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const ActivationCode = () => {
  const router = useRouter();
  const { activationEmail, isGreek } = useUserContext();
  const [expired, setExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const isNotEmptyString = (value: string) => value.trim() !== "";
  const isNotExpire = () => expired !== true;

  const isNotEmptyAndIsNotExpire = (value: string) =>
    isNotEmptyString(value) && isNotExpire();

  const {
    value: actCodeValue,
    hasError: actCodeHasError,
    isValid: actCodeIsValid,
    valueChangeHandler: actCodeChangeHandler,
    inputBlurHandler: actCodeBlurHandler,
    reset: resetActCode,
  } = useInput(isNotEmptyAndIsNotExpire, "");

  const sendNewCodeHandler = async () => {
    const res = await SEND_NEW_ACTIVATION_CODE(activationEmail);

    if (res.status === 200) {
      setSeconds(30);
      setMinutes(0);
      setExpired(false);
      toast.success("New code has been sent to email", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      return;
    }
  };

  const activateHandler = async (e: any) => {
    e.preventDefault();

    if (actCodeIsValid) {
      const activateAccount = {
        email: activationEmail,
        actCode: parseInt(actCodeValue, 10),
      };

      const res: any = await ACTIVATE_ACCOUNT(activateAccount);
      setLoading(true);
      if (res !== 200) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return;
      } else {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        setTimeout(() => {
          setLoading(false);
          resetActCode;
        }, 2000);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        setExpired(true);
      } else {
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

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
            {isGreek ? "Επαλήθευση λογαριασμού" : "Verify Account"}
          </h1>

          <form className="mt-6" onSubmit={activateHandler}>
            <div className="mb-6">
              <InputFieldCode
                inputError={actCodeHasError}
                type="number"
                id="actCode"
                label={`${
                  isGreek ? "Κωδικός ενεργοποίησης" : "Activation Code"
                }`}
                value={actCodeValue}
                onChangeValue={actCodeChangeHandler}
                onBlurValue={actCodeBlurHandler}
              />
              {actCodeHasError && (
                <div className="flex px-4 py-2 text-pink-600 font-bold">
                  <BiErrorCircle />
                  <p className="text-xs px-2">
                    {isGreek
                      ? "Ο κωδικός ενεργοποίησης είναι λανθασμένος"
                      : "The activation code is incorrect"}
                  </p>
                </div>
              )}
            </div>
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={sendNewCodeHandler}
            >
              {!expired ? (
                <p>
                  {isGreek ? "αποστολή νέου κωδικού" : "send new code"} ({" "}
                  {minutes}:{seconds} )
                </p>
              ) : (
                <p>
                  {isGreek ? "αποστολή νέου κωδικού" : "send new code"}{" "}
                  <span className="text-pink-600 font-bold">
                    ( {isGreek ? "έληξε" : "expired"} )
                  </span>
                </p>
              )}
            </button>
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
                      ? "Ενεργοποίηση..."
                      : "Activating..."
                    : isGreek
                    ? "Ενεργοποίηση"
                    : "Activate"}
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

export default ActivationCode;
