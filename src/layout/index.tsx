import React from 'react';
import { ConfigProvider, Alert } from 'antd';
import { useDispatch, useModel, useSelector } from 'umi';
import { COIN_TYPE } from '@/configs/enum';
import { WaterMark } from '@ant-design/pro-layout';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import zhCN from 'antd/lib/locale/zh_CN';
import { LINKS } from '@/configs/links';
import Storage from '@/utils/storage';
import Browser from '@/utils/browser';
import { STORAGE_KEY, THEME_COLORS } from '@/configs';

import 'moment/locale/zh-cn';

if (process.env.SENTRY_KEY) {
  Sentry.init({
    dsn: process.env.SENTRY_KEY,
    integrations: [new Integrations.BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const Context = React.createContext({
  coinCode: COIN_TYPE.USDT,
  toggleCoinCode: () => null,
});

const BrowserHappy = () => {
  if (!Browser.isBrowserHappy()) {
    return (
      <Alert
        className="tw-text-center"
        showIcon={false}
        message={
          <div>
            你的浏览器版本过低，请升级你的浏览器：
            <a href={LINKS.BROWSER_HAPPY} target="_blank">
              {LINKS.BROWSER_HAPPY}
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
  const dispatch = useDispatch();
  const { coin_code } = useSelector((state: any) => state.system);

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

  const toggleCoinCode = () => {
    const coinCode =
      coin_code === COIN_TYPE.FAU ? COIN_TYPE.USDT : COIN_TYPE.FAU;
    dispatch({
      type: 'system/setCoinCode',
      payload: coinCode,
    });
    Storage.setItem(STORAGE_KEY.COINCODE, coinCode);
    return null;
  };

  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <BrowserHappy />

      <Context.Provider
        value={{
          coinCode: coin_code,
          toggleCoinCode,
        }}
      >
        <WaterMark content={waterMarkContent} {...props}>
          {props.children}
        </WaterMark>
      </Context.Provider>
    </ConfigProvider>
  );
};

export { Context };
export default Container;
