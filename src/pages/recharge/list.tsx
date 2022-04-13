import React from 'react';
import ContentHeader from '@/components/contentHeader';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/recharge/list',
    breadcrumbName: '充值',
  },
];

const RechargeListPage: React.FC = () => {
  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="Faucet">
        一些说明文案
      </ContentHeader>
      <div className="main-container">RechargeListPage</div>
    </>
  );
};

export default RechargeListPage;
