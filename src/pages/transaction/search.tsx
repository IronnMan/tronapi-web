import React from 'react';
import ContentHeader from '@/components/contentHeader';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/transaction/list',
    breadcrumbName: '订单',
  },
  {
    path: '',
    breadcrumbName: '查询',
  },
];

const TransactionSearchPage: React.FC<any> = () => {
  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="查询" />
      <div className="main-container">search</div>
    </>
  );
};

export default TransactionSearchPage;
