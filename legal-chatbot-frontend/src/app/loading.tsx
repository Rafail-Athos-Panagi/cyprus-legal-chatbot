const LoadingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-86vh overflow-hidden dark:bg-light">
      <div
        className="dark:text-sky-400/100 text:dark inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] dark:text-sky-400/100 text:dark">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
