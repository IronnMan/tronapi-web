import React from 'react';
import { ConfigProvider, Alert } from 'antd';
import { useModel } from 'umi';
import { WaterMark } from '@ant-design/pro-layout';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import zhCN from 'antd/lib/locale/zh_CN';
import { LINK } from '@/configs/links';
import Storage from '@/utils/storage';
import Browser from '@/utils/browser';
import { STORAGE_KEY, THEME_COLORS } from '@/configs';

import 'moment/locale/zh-cn';

if (process.env.SENTRY_KEY) {
  Sentry.init({
    dsn: process.env.SENTRY_KEY,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const BrowserHappy = () => {
  if (!Browser.isBrowserHappy()) {
    return (
      <Alert
        className="tw-text-center"
        showIcon={false}
        message={
          <div>
            你的浏览器版本过低，请升级你的浏览器：
            <a href={LINK.BROWSER_HAPPY} target="_blank">
              {LINK.BROWSER_HAPPY}
            </a>
          </div>
        }
        banner
      />
    );
  }
  return null;
};

const Container: React.FC<any> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser = {} } = initialState!;
  let waterMarkContent = '';
  if (currentUser.username) {
    waterMarkContent = currentUser.username;
  } else {
    const settings: any = initialState?.settings;
    waterMarkContent = settings.name;
  }

  React.useEffect(() => {
    const themeColor = Storage.getItem(STORAGE_KEY.THEME_COLOR);
    ConfigProvider.config({
      theme: {
        primaryColor: themeColor || THEME_COLORS[0],
      },
    });
  }, []);

  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <BrowserHappy />
      <WaterMark content={waterMarkContent} {...props}>
        {props.children}
      </WaterMark>
    </ConfigProvider>
  );
};

export default Container;
