import InputFieldProfile from "./InputFieldProfile";

const ProfileInputs = ({ isEdit, isGreek, data }: any) => {
  const isoDateString = data.user.dateOfBirth;
  const formattedDate = isoDateString.substring(0, 10);

  return (
    <>
      <InputFieldProfile
        label={`${isGreek ? "Ηλεκτρονική Διεύθυνση" : "Email"}`}
        isEdit={isEdit}
        value={data.user.email}
        type="email"
      />
      <InputFieldProfile
        label={`${isGreek ? "Όνομα" : "Name"}`}
        isEdit={isEdit}
        value={data.user.name}
        type="text"
      />
      <InputFieldProfile
        label={`${isGreek ? "Επώνυμο" : "Surname"}`}
        isEdit={isEdit}
        value={data.user.surname}
        type="text"
      />
      <InputFieldProfile
        label={`${isGreek ? "Ημερομηνία Γέννησης" : "Date Of Birth"}`}
        isEdit={isEdit}
        value={formattedDate}
        type="date"
      />
    </>
  );
};

export default ProfileInputs;
