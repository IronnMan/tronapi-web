import React from 'react';
import { Tabs, message } from 'antd';
import { useHistory, useModel, useDispatch, useSelector } from 'umi';
import ContentHeader from '@/components/contentHeader';
import { SETTING_TYPE } from '@/configs/setting';
import {
  Webhook,
  Keystone,
  TwoFactor,
  Notification,
  Withdrawal,
  Transaction,
  Security,
} from './components';

const { TabPane } = Tabs;

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '',
    breadcrumbName: '设置',
  },
];

const DEFAULT_TAB = SETTING_TYPE.TRANSACTION;

const SettingPage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser = {} } = initialState!;
  const {
    user_config = {},
    user_keystone = {},
    user_transaction_configs,
  } = currentUser;

  const dispatch = useDispatch();
  const { location } = useHistory();
  const { query }: any = location;
  const [tab, setTab] = React.useState(query.tab || DEFAULT_TAB);

  const updateUserInfo = React.useCallback(async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  }, []);

  const onSubmit = async (values: any) => {
    const res: any = await dispatch({
      type: 'user/updateConfig',
      payload: values,
    });

    if (res && res.success === true) {
      message.success(res.data);
      updateUserInfo();
    }
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['user/updateConfig'],
  );

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="设置" />
      <div className="main-container">
        <Tabs defaultActiveKey={tab} onChange={(key) => setTab(key)}>
          <TabPane tab="订单设置" key={SETTING_TYPE.TRANSACTION}>
            <Transaction
              onSubmit={onSubmit}
              data={user_transaction_configs}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="通知设置" key={SETTING_TYPE.NOTIFICATION}>
            <Notification
              onSubmit={onSubmit}
              data={user_config}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="提现设置" key={SETTING_TYPE.WITHDRAWAL}>
            <Withdrawal
              onSubmit={onSubmit}
              data={user_config}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="安全设置" key={SETTING_TYPE.TWOFACTOR}>
            <TwoFactor
              onSubmit={onSubmit}
              data={user_config}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="白名单设置" key={SETTING_TYPE.SECURITY}>
            <Security
              onSubmit={onSubmit}
              data={user_config}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="回调配置" key={SETTING_TYPE.WEBHOOK}>
            <Webhook onSubmit={onSubmit} data={user_config} loading={loading} />
          </TabPane>
          <TabPane tab="密钥信息" key={SETTING_TYPE.KEYSTONE}>
            <Keystone
              onSubmit={onSubmit}
              data={user_keystone}
              loading={loading}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default SettingPage;
