import React, { createContext, useState } from 'react';

export const WholeLoadingContext = createContext();

const WholeLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <WholeLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </WholeLoadingContext.Provider>
  );
};

export default WholeLoadingProvider;
