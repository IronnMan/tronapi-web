import React from 'react';
import ContentHeader from '@/components/contentHeader';

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
    breadcrumbName: '地址生成',
  },
];

const GeneratePage: React.FC = () => {
  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="Faucet">
        一些说明文案
      </ContentHeader>
      <div className="main-container">GeneratePage</div>
    </>
  );
};

export default GeneratePage;
