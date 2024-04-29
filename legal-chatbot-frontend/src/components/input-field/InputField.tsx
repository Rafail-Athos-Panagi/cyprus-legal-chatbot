import { ChangeEvent, useState } from "react";

interface InputFieldProps {
  inputError: boolean;
  type: string;
  id: string;
  label: string;
  value: string | number | undefined;
  onChangeValue: (event: any) => void;
  onBlurValue: () => void;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const [enteredValue, setEnteredValue] = useState(props.value);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
    props.onChangeValue(event);
  };

  const onBlurHandler = () => {
    props.onBlurValue();
  };

  const inputClasses = `block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none focus:ring-1 dark:bg-light dark:text-white ${
    props.inputError
      ? "border-pink-500 text-pink-700 focus:border-pink-500 focus:ring-pink-500 ring-pink-700"
      : "border-gray-500 dark:text-white focus:border-sky-500  focus:ring-sky-500 ring-grey-700"
  }`;

  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-semibold text-gray-800 dark:text-white"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        className={inputClasses}
        id={props.id}
        value={enteredValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

export default InputField;
