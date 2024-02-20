import { createIntl, createIntlCache } from 'react-intl';
import en from './en-US.json';
import zh from './zh-CN.json';

const messages = {
  'en': en,
  'zh': zh,
};

const cache = createIntlCache();

//修改intl的值
export const createIntlObject = (locale) => {
  return createIntl({
    locale: locale,
    messages: messages[locale]
  }, cache);
};
