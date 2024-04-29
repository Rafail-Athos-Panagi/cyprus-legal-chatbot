import ProfileInputs from "./ProfileInputs";

const ProfileForm = ({ isEdit, isGreek, data }: any) => {
  return <ProfileInputs isGreek={isGreek} isEdit={isEdit} data={data} />;
};

export default ProfileForm;
