import React from 'react';
import Router from '@/router';
import WholeLoadingProvider from '@/components/whole-loading-provider'; //全局Loading
// import { ConfigProvider } from 'antd';
// import enUS from 'antd/lib/locale/en_US';
// import zhCN from 'antd/lib/locale/zh_CN';

import CustomIntlProvider from '@/components/IntlProvider'; //国际化

function App() {
  return (
    <CustomIntlProvider>
      <WholeLoadingProvider>
        <Router />
      </WholeLoadingProvider>
    </CustomIntlProvider>
  );
}

export default App;
