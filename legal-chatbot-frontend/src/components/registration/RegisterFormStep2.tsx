"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import useInput from "@/app/hooks/user-input";
import { validDate, onlyLettersRegex } from "../regex/Regex";
import InputField from "../input-field/InputField";
import { useRouter } from "next/navigation";
import { BiErrorCircle } from "react-icons/bi";
import { useUserContext } from "@/app/context/UserContext";
import { SIGNUP } from "@/app/api/auth/auth";
import { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    changeRegisterStep2Form,
    changeRegisterStep1Form,
    registerStep2Form,
    registerStep1Form,
    changeActivationEmail,
    isGreek,
  } = useUserContext();

  const isNotEmptyString = (value: string) => value.trim() !== "";
  const isString = (value: any) => onlyLettersRegex.test(value);
  const isValidDate = (value: string) => validDate.test(value);

  const isNotEmptyAndIsString = (value: string) =>
    isNotEmptyString(value) && isString(value);
  const isNotEmptyAndIsValidDate = (value: string) =>
    isNotEmptyString(value) && isValidDate(value);

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(
    isNotEmptyAndIsString,
    registerStep2Form.firstName ? registerStep2Form.firstName : ""
  );

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(
    isNotEmptyAndIsString,
    registerStep2Form.lastName ? registerStep2Form.lastName : ""
  );

  const {
    value: dateOfBirthValue,
    hasError: dateOfBirthHasError,
    isValid: dateOfBirthIsValid,
    valueChangeHandler: dateOfBirthChangeHandler,
    inputBlurHandler: dateOfBirthBlurHandler,
    reset: resetDateOfBirth,
  } = useInput(
    isNotEmptyAndIsValidDate,
    registerStep2Form.dateOfBirth ? registerStep2Form.dateOfBirth : ""
  );

  const signUpHandler = async (e: any) => {
    e.preventDefault();
    if (firstNameIsValid && lastNameIsValid && dateOfBirthIsValid) {
      resetFirstName;
      resetLastName;
      resetDateOfBirth;

      const register2Data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        dateOfBirth: dateOfBirthValue,
      };

      const registerData = {
        email: registerStep1Form.email,
        password: registerStep1Form.password,
        firstName: firstNameValue,
        lastName: lastNameValue,
        dateOfBirth: dateOfBirthValue,
      };

      changeRegisterStep2Form(register2Data);
      setLoading(true);
      const res = await SIGNUP(registerData);
      if (res?.status != 201) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return null;
      } else {
        changeActivationEmail(registerData.email);
        setTimeout(() => {
          router.push("/activate-code");
        }, 1000);
        setTimeout(() => {
          changeRegisterStep1Form({
            email: "",
            password: "",
          });
          changeRegisterStep2Form({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
          });
          setLoading(false);
        }, 2000);
      }
    } else {
      firstNameBlurHandler();
      lastNameBlurHandler();
      dateOfBirthBlurHandler();
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-86vh dark:bg-light">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl dark:bg-very_dark">
        <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
          {isGreek ? "Πρόσθετες πληροφορίες" : "Additional Info"}
        </h1>

        <form className="mt-6" onSubmit={signUpHandler}>
          <div className="mb-6">
            <InputField
              inputError={firstNameHasError}
              type="text"
              id="firstName"
              label={`${isGreek ? "Όνομα" : "First Name"}`}
              value={firstNameValue}
              onChangeValue={firstNameChangeHandler}
              onBlurValue={firstNameBlurHandler}
            />
            {firstNameHasError && (
              <div className="flex px-4 py-2 text-pink-600 font-bold">
                <BiErrorCircle />
                <p className="text-xs px-2">
                  {isGreek
                    ? "Μην χρησιμοποιείτε ειδικούς χαρακτήρες ή αριθμούς"
                    : "Do not use special characters or numbers"}
                </p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <InputField
              inputError={lastNameHasError}
              type="text"
              id="lastName"
              label={`${isGreek ? "Επώνυμο" : "Last Name"}`}
              value={lastNameValue}
              onChangeValue={lastNameChangeHandler}
              onBlurValue={lastNameBlurHandler}
            />
            {lastNameHasError && (
              <div className="flex px-4 py-2 text-pink-600 font-bold">
                <BiErrorCircle />
                <p className="text-xs px-2">
                  {isGreek
                    ? "Μην χρησιμοποιείτε ειδικούς χαρακτήρες ή αριθμούς"
                    : "Do not use special characters or numbers"}
                </p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <InputField
              inputError={dateOfBirthHasError}
              type="date"
              id="dateOfBirth"
              label={`${isGreek ? "Ημερομηνία γέννησης" : "Date Of Birth"}`}
              value={dateOfBirthValue}
              onChangeValue={dateOfBirthChangeHandler}
              onBlurValue={dateOfBirthBlurHandler}
            />
            {dateOfBirthHasError && (
              <div className="flex px-4 py-2 text-pink-600 font-bold">
                <BiErrorCircle />
                <p className="text-xs px-2">
                  {isGreek
                    ? "Χρήση της μορφής ημερομηνίας "
                    : "Use the date format "}
                  <span className="italic"></span>
                  {isGreek ? "( ΗΗ/ΜΜ/ΕΕΕΕ )" : "( DD/MM/YYYY )"}
                </p>
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
                    ? "Εγγραφή..."
                    : "Registering.."
                  : isGreek
                  ? "Εγγραφή"
                  : "Register"}
              </div>
            </button>
            <Link
              href="/register"
              className="font-medium text-blue-800"
              onClick={() => {
                const register2Data = {
                  firstName: firstNameValue,
                  lastName: lastNameValue,
                  dateOfBirth: dateOfBirthValue,
                };

                changeRegisterStep2Form(register2Data);
              }}
            >
              <div className="flex items-center justify-items-start pt-4">
                <HiArrowLeft size={20} />
                <p className="pl-2"></p>
                {`${
                  isGreek
                    ? "Πίσω στις Πληροφορίες Εγγραφής"
                    : "Back To Register Info"
                }`}
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
