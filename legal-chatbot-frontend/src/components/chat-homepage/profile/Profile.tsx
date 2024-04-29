"use client";

import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { useUserContext } from "@/app/context/UserContext";
import LoadingPage from "@/app/loading";
import { Suspense } from "react";
import ProfileForm from "./ProfileForm";
import ProfileFormSkeleton from "./ProfileFormSkeleton";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRevert, setsRevert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  const { isGreek } = useUserContext();

  const changeModalState = (state: any) => {
    setOpenChangePasswordModal(state);
  };

  const { data: session, status } = useSession();

  const revertData = () => {
    setIsEdit(false);
  };

  const changeData = () => {
    console.log("CHANGE")
  };

  return (
    <>
      <ChangePasswordModal
        isOpen={openChangePasswordModal}
        changeState={changeModalState}
      />
      <div className="xl:mx-80 xl:mt-20 mx-10 mt-10">
        <div className="px-4 sm:px-0">
          <h3 className="text-3xl font-semibold leading-7 dark:text-gray-300">
            {isGreek ? "Πληροφορίες Προφίλ" : "Profile Information"}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 dark:text-gray-200 text-md">
            {isGreek ? "Προσωπικά στοιχεία." : "Personal details."}
          </p>
        </div>
        <div className="mt-6 border-t dark:border-gray-100 border-gray-900">
          <dl className="divide-y divide-gray-600">
            {status === "loading" ? (
              <ProfileFormSkeleton />
            ) : (
              <ProfileForm isGreek={isGreek} isEdit={isEdit} data={session} />
            )}
            <div className="px-4 py-6 xl:grid xl:grid-cols-3 xl:gap-4 xl:px-0">
              <dt className="text-md font-medium leading-6 dark:text-gray-300 flex items-center">
                {isGreek ? "Κωδικός Πρόσβασης" : "Password"}
              </dt>
              <dd className="text-sm leading-6 dark:text-gray-200 xl:col-span-2 xl:mt-0 mt-6">
                <button
                  type="button"
                  disabled={isEdit ? false : true}
                  onClick={() => setOpenChangePasswordModal(true)}
                  className={`"w-full 2xl:w-1/2 px-4 py-2 tracking-wide text-white transition-colors duration-200  rounded-md ${
                    isEdit ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-500"
                  } focus:outline-none focus:bg-gray-600`}
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
                        <span className="sr-only">
                          {/* {`${isGreek ? "Φόρτωση..." : "Loading..."}`} */}
                        </span>
                      </div>
                    )}

                    {/* {loading ? (isGreek ? "Φόρτωση..." : "Loading...") : (isGreek ? "Είσοδος" : "Login")} */}
                  </div>
                  {isGreek ? "ΑΛΛΑΓΗ ΚΩΔΙΚΟΥ" : "CHANGE PASSWORD"}
                </button>
              </dd>
            </div>
            <div className="mb-8 xl:grid xl:grid-cols-3 xl:gap-4 xl:px-0">
              <dt className="text-md font-medium leading-6 dark:text-gray-300 flex items-center"></dt>
              <dd className="text-sm leading-6 dark:text-gray-200 xl:col-span-2 xl:mt-0 mt-6"></dd>
            </div>
          </dl>
          <div className="text-sm leading-6 dark:text-gray-200 sm:col-span-2 sm:mt-0 xl:flex xl:justify-end">
            <button
              type="submit"
              disabled={isEdit ? false : true}
              className={`w-full xl:w-1/3 xl:mr-8 mb-8 px-4 py-2 tracking-wide text-white transition-colors duration-200 rounded-md focus:outline-none focus:bg-gray-600 ${
                isEdit ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-500"
              }`}
              onClick={() => revertData()}
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
                    <span className="sr-only">
                      {/* {`${isGreek ? "Φόρτωση..." : "Loading..."}`} */}
                    </span>
                  </div>
                )}

                {/* {loading ? (isGreek ? "Φόρτωση..." : "Loading...") : (isGreek ? "Είσοδος" : "Login")} */}
              </div>
              {isGreek ? "ΑΚΥΡΩΣΗ" : "CANCEL"}
            </button>
            {isEdit ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full mb-8 xl:w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none"
                onClick={() => changeData()}
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
                      <span className="sr-only">
                        {/* {`${isGreek ? "Φόρτωση..." : "Loading..."}`} */}
                      </span>
                    </div>
                  )}

                  {/* {loading ? (isGreek ? "Φόρτωση..." : "Loading...") : (isGreek ? "Είσοδος" : "Login")} */}
                </div>
                {isGreek ? "ΕΠΙΒΕΒΑΙΏΣΤΕ ΤΙΣ ΑΛΛΑΓΈΣ" : "CONFIRM CHANGES"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full mb-8 xl:w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none"
                onClick={() => setIsEdit(true)}
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
                      <span className="sr-only">
                        {/* {`${isGreek ? "Φόρτωση..." : "Loading..."}`} */}
                      </span>
                    </div>
                  )}

                  {/* {loading ? (isGreek ? "Φόρτωση..." : "Loading...") : (isGreek ? "Είσοδος" : "Login")} */}
                </div>
                {isGreek ? "ΕΠΕΞΕΡΓΑΣΙΑ" : "EDIT"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
