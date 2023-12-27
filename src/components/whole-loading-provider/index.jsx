import React, { createContext, useState } from 'react';

export const WholeLoadingContext = createContext();

const WholeLoadingProvider = ({ children }) => {
  const [isWholeLoading, setIsWholeLoading] = useState(false);

  return (
    <WholeLoadingContext.Provider value={{ isWholeLoading, setIsWholeLoading }}>
      {children}
    </WholeLoadingContext.Provider>
  );
};

export default WholeLoadingProvider;
