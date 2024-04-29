import { useState, useEffect } from 'react';

const useScreenSize = ({ screenSize }: { screenSize: number }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < screenSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenSize]); // Make sure to include screenSize in the dependency array

  return isMobile;
};

export default useScreenSize;