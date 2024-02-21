import React from 'react';
import Router from '@/router';
import WholeLoadingProvider from '@/components/whole-loading-provider'; //全局Loading

function App() {
  return (
    <WholeLoadingProvider>
      <Router />
    </WholeLoadingProvider>
  );
}

export default App;
