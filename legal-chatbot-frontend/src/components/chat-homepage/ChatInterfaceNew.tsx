import TextAreaResponsiveNew from "../input-field/TextAreaResponsiveNew";

const ChatInterfaceNew = () => {
  return (
    <div className="min-h-86vh flex flex-col justify-center items-center">
      <label htmlFor="comment" className="mb-6 text-2xl text-fold sm:text-2xl text-xl">
        Explore The Cyprus Legal System
      </label>
      <div className="2xl:w-1/2 w-full">
        <TextAreaResponsiveNew />
      </div>
      <div className="mt-4 flex flex-col items-center sm:flex sm:flex-row">
        <span className="mr-10 text-blue-400 font-bold mb-4 md:mr-4 md:ml-10">Common Searches:</span>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mr-4"
        > 
          What am i?
        </button>
        <button
          type="button"
          className="md:mr-10 py-2.5 px-5 lg:me-2 lg:mr-0 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mr-4"
        >
          What legal documents am trained for?
        </button>
      </div>
    </div>
  );
};

export default ChatInterfaceNew;
