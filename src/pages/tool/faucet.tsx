import React from 'react';
import { Tabs } from 'antd';
import ContentHeader from '@/components/contentHeader';
import { COIN_TYPE } from '@/configs/enum';
import { Fau, Trx } from './components';

const { TabPane } = Tabs;

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/tool/faucet',
    breadcrumbName: '工具',
  },
  {
    path: '',
    breadcrumbName: 'Faucet',
  },
];

const FaucetPage: React.FC = () => {
  const [tab, setTab] = React.useState('FAU');
  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="Faucet">
        商户可免费获取测试 FAU 及 TRX，用于开发联调使用。
      </ContentHeader>
      <div className="main-container">
        <Tabs defaultActiveKey={tab} onChange={(key) => setTab(key)}>
          <TabPane tab="FAU" key="FAU">
            <Fau />
          </TabPane>
          <TabPane tab="TRX" key="TRX">
            <Trx />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default FaucetPage;
