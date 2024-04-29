import { useUserContext } from "@/app/context/UserContext";
import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }: any) => {
  const { isGreek } = useUserContext();

  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return isGreek ? "Πολύ αδύναμος" : "Very weak";
      case 1:
        return isGreek ? "Aδύναμος" : "Weak";
      case 2:
        return isGreek ? "Καλός" : "Good";
      case 3:
        return isGreek ? "Αρκετά Καλός" : "Strong";
      case 4:
        return isGreek ? "Πολύ Καλός" : "Very Strong";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
    borderRadius: "30px",
    marginTop: "10px",
  });

  return (
    <>
      <div className="progress" style={{ height: "7px" }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
};

export default PasswordStrengthMeter;
