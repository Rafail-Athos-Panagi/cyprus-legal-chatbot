import { useUserContext } from "@/app/context/UserContext";
import useInput from "@/app/hooks/user-input";
import { onlyLettersRegex } from "@/components/regex/Regex";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

const InputFieldProfile = ({ label, isEdit, value , type }: any) => {
  const [defaultValue, setDefaultValue] = useState<string>(value);
  const inputClasses =
    "2xl:w-1/2 w-full w-1/2 px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-1 border-gray-500 text-gray-700 focus:border-sky-500 focus:ring-sky-500 ring-grey-700 dark:bg-light dark:text-white";

  const isNotEmptyString = (value: string) => value.trim() !== "";
  const isString = (value: any) => onlyLettersRegex.test(value);

  const isNotEmptyAndIsString = (value: string) =>
    isNotEmptyString(value) && isString(value);

  const {
    value: formValue,
    hasError: formValueHasError,
    isValid: formValueIsValid,
    valueChangeHandler: formValueChangeHandler,
    inputBlurHandler: formValueBlurHandler,
    reset: resetFormValue,
  } = useInput(isNotEmptyAndIsString, value);

  const { isGreek } = useUserContext();

  return (
    <div className="px-4 py-6 xl:grid xl:grid-cols-3 xl:gap-4 xl:px-0">
      <dt className="text-md font-medium leading-6 dark:text-gray-300 flex items-center">
        {label}
      </dt>
      <dd className="text-sm leading-6 dark:text-gray-200 xl:col-span-2 xl:mt-0 mt-6">
        {" "}
        <input
          type={type}
          className={`${
            type === "email"
              ? "2xl:w-1/2 w-full px-4 py-2 text-gray-700 bg-slate-300 border rounded-md"
              : isEdit
              ? inputClasses
              : "2xl:w-1/2 w-full px-4 py-2 text-gray-700 bg-slate-300 border rounded-md"
          }`}
          value={formValue}
          disabled={type === "email" ? true : isEdit ? false : true}
          onChange={formValueChangeHandler}
          onBlur={formValueBlurHandler}
        />
        {formValueHasError && (
          <div className="flex px-4 py-2 text-pink-600 font-bold">
            <BiErrorCircle />
            <p className="text-xs px-2">
              {isGreek
                ? "Μην χρησιμοποιείτε ειδικούς χαρακτήρες ή αριθμούς"
                : "Do not use special characters or numbers"}
            </p>
          </div>
        )}
      </dd>
    </div>
  );
};

export default InputFieldProfile;
