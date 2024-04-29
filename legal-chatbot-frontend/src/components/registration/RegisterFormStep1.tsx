"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import useInput from "@/app/hooks/user-input";
import { validEmail, validPassword } from "../regex/Regex";
import InputField from "../input-field/InputField";
import { useRouter } from "next/navigation";
import { BiErrorCircle } from "react-icons/bi";
import { useUserContext } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { EMAIL_CHECK } from "@/app/api/auth/auth";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const RegisterForm = () => {
  const router = useRouter();

  const { changeRegisterStep1Form, registerStep1Form, isGreek } =
    useUserContext();

  const [emailError, setEmailError] = useState<string>(
    `${isGreek ? "Η ηλεκτρονική διεύθυνση είναι λάθος" : "Email is wrong"}`
  );

  const [emailValue, setEmailValue] = useState<string>(
    registerStep1Form.email ? registerStep1Form.email : ""
  );
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [emailHasError, setEmailHasError] = useState<boolean>(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const isNotEmptyString = (value: string) => value.trim() !== "";
  const isValidPassword = (value: string) => validPassword.test(value);
  const isValidConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const isNotEmptyAndIsValidPassword = (value: string) =>
    isNotEmptyString(value) && isValidPassword(value);
  const isNotEmptyAndIsValidPasswords = (value: string) =>
    isNotEmptyString(value) &&
    isValidConfirmPassword(value, String(passwordValue));

  const emailChangeHandler = (event: any) => {
    setEmailValue(event.target.value);
  };

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(
    isNotEmptyAndIsValidPassword,
    registerStep1Form.password ? registerStep1Form.password : ""
  );

  const {
    value: confirmPasswordValue,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput(
    isNotEmptyAndIsValidPasswords,
    registerStep1Form.password ? registerStep1Form.password : ""
  );

  const signUpHandler = async (e: any) => {
    e.preventDefault();

    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
      const register1Data = { email: emailValue, password: passwordValue };

      changeRegisterStep1Form(register1Data);
      setLoading(true);
      setTimeout(() => {
        router.push("register/register-details");
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      emailBlurHandler();
      passwordBlurHandler();
      confirmPasswordBlurHandler();
      return;
    }
  };

  useEffect(() => {
    const emailValidation = async () => {
      if (emailValue.trim() !== "" && validEmail.test(emailValue)) {
        const res: any = await EMAIL_CHECK(emailValue);

        if (res === 401) {
          setEmailError(
            `${
              isGreek
                ? "Η ηλεκτρονική διεύθυνση είναι ήδη καταχωρημένη"
                : "Email is already registered"
            }`
          );
          setEmailIsValid(false);
          setEmailHasError(emailIsTouched ? true : false);
          return;
        } else {
          setEmailError(
            `${
              isGreek ? "Η ηλεκτρονική διεύθυνση είναι λάθος" : "Email is wrong"
            }`
          );
          setEmailIsValid(true);
          setEmailHasError(false);
        }
      } else {
        setEmailIsValid(false);
        setEmailHasError(emailIsTouched ? true : false);
      }
    };

    emailValidation();
  }, [emailValue, emailIsTouched]);

  return (
    <div className="flex flex-col items-center justify-center min-h-86vh dark:bg-light">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl dark:bg-very_dark">
        <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
          {`${isGreek ? "Πληροφορίες Εγγραφής" : "Register Info"}`}
        </h1>

        <form className="mt-6" onSubmit={signUpHandler}>
          <div className="mb-6">
            <InputField
              inputError={emailHasError}
              type="email"
              id="email"
              label={`${isGreek ? "Ηλεκτρονική Διεύθυνση" : "Email"}`}
              value={emailValue}
              onChangeValue={emailChangeHandler}
              onBlurValue={emailBlurHandler}
            />
            {emailHasError && (
              <div className="flex px-4 py-2 text-pink-600 font-bold">
                <BiErrorCircle />
                <p className="text-xs px-2">{emailError}</p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <InputField
              inputError={passwordHasError}
              type="password"
              id="password"
              label={`${isGreek ? "Κωδικός" : "Password"}`}
              value={passwordValue}
              onChangeValue={passwordChangeHandler}
              onBlurValue={passwordBlurHandler}
            />
            {passwordHasError && (
              <div className="flex px-4 py-2 text-pink-600 font-bold">
                <BiErrorCircle />
                <p className="text-xs px-2">
                  {`${
                    isGreek
                      ? "Ο κωδικός πρόσβασης πρέπει να είναι πάνω από 8 χαρακτήρες"
                      : "The password must be above 8 characters"
                  }`}
                </p>
              </div>
            )}
            <PasswordStrengthMeter
              password={passwordValue}
            ></PasswordStrengthMeter>
          </div>
          <div className="mb-6">
            <InputField
              inputError={confirmPasswordHasError}
              type="password"
              id="confirmPassword"
              label={`${
                isGreek ? "Επιβεβαίωση Κωδικού Πρόσβασης" : "Confirm Passowrd"
              }`}
              value={confirmPasswordValue}
              onChangeValue={confirmPasswordChangeHandler}
              onBlurValue={confirmPasswordBlurHandler}
            />
            {confirmPasswordHasError && (
              <div className="flex px-4 py-2 text-pink-600 font-bold">
                <BiErrorCircle />
                <p className="text-xs px-2">{`${
                  isGreek
                    ? "Ο κωδικός πρόσβασης δεν ταιριάζει"
                    : "The password do not match"
                }`}</p>
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
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
                    ? "Συνέχεια..."
                    : "Continue..."
                  : isGreek
                  ? "Συνέχεια"
                  : "Continue"}
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
  );
};

export default RegisterForm;
