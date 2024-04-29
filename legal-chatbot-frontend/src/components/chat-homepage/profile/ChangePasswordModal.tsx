import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useUserContext } from "@/app/context/UserContext";

export default function ChangePasswordModal({ isOpen, changeState }: any) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { isGreek } = useUserContext();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const setToFalse = () => {
    setOpen(true);
    changeState(true);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setToFalse}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="dark:bg-light px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PencilSquareIcon
                        className="h-6 w-6 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-bold leading-6 dark:text-gray-300"
                      >
                        {isGreek
                          ? "Αλλαγή Κωδικού Πρόσβασης"
                          : "Change Password"}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <dl className="divide-y divide-gray-600">
                            <div className="px-4 py-6 xl:grid xl:grid-cols-3 xl:gap-4 xl:px-0">
                              <dt className="text-md font-medium leading-6 dark:text-gray-300 flex items-center">
                                {isGreek
                                  ? "Παλιός Κωδικός Πρόσβασης"
                                  : "Old Password"}
                              </dt>
                              <dd className="text-sm leading-6 dark:text-gray-200 xl:col-span-2 xl:mt-0 mt-6">
                                {" "}
                                <input
                                  type="email"
                                  className={
                                    "w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-1 border-gray-500 text-gray-700 focus:border-sky-500 focus:ring-sky-500 ring-grey-700 dark:bg-light dark:text-white"
                                  }
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 xl:grid xl:grid-cols-3 xl:gap-4 xl:px-0">
                              <dt className="text-md font-medium leading-6 dark:text-gray-300 flex items-center">
                                {isGreek
                                  ? "Νέος Κωδικός Πρόσβασης"
                                  : "New Password"}
                              </dt>
                              <dd className="text-sm leading-6 dark:text-gray-200 xl:col-span-2 xl:mt-0 mt-6">
                                {" "}
                                <input
                                  type="email"
                                  className={
                                    "w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-1 border-gray-500 text-gray-700 focus:border-sky-500 focus:ring-sky-500 ring-grey-700 dark:bg-light dark:text-white"
                                  }
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 xl:grid xl:grid-cols-3 xl:gap-4 xl:px-0">
                              <dt className="text-md font-medium leading-6 dark:text-gray-300 flex items-center">
                                {isGreek
                                  ? "Επιβεβαίωση Νέου Κωδικού Πρόσβασης"
                                  : "Confirm New Password"}
                              </dt>
                              <dd className="text-sm leading-6 dark:text-gray-200 xl:col-span-2 xl:mt-0 mt-6">
                                {" "}
                                <input
                                  type="email"
                                  className={
                                    "w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-1 border-gray-500 text-gray-700 focus:border-sky-500 focus:ring-sky-500 ring-grey-700 dark:bg-light dark:text-white"
                                  }
                                />
                              </dd>
                            </div>
                          </dl>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dark:bg-medium px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-green-900 ring-gray-300 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      changeState(false);
                    }}
                  >
                    {isGreek ? "ΕΠΙΒΕΒΑΙΩΣΤΕ ΤΙΣ ΑΛΛΑΓΈΣ" : "CONFIRM CHANGES"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-700 ring-inset hover:bg-red-500 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      changeState(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    {isGreek ? "ΑΚΥΡΩΣΗ" : "CANCEL"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
