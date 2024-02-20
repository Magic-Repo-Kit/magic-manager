import React, { createContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { createIntlObject } from '@/i18n';

export const IntlContext = createContext();

const CustomIntlProvider = ({ children }) => {
  const defaultLocale =
    JSON.parse(localStorage.getItem('currentLocale')) || 'zh'; //默认语言
  const [currentIntl, setCurrentIntl] = useState(
    createIntlObject(defaultLocale)
  );

  // 监听 currentIntl 变化，存储locale到本地
  useEffect(() => {
    localStorage.setItem('currentLocale', JSON.stringify(currentIntl.locale));
  }, [currentIntl]);

  return (
    <IntlContext.Provider value={{ currentIntl, setCurrentIntl }}>
      <IntlProvider
        locale={currentIntl.locale}
        key={currentIntl.locale}
        messages={currentIntl.messages}
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};
export default CustomIntlProvider;
