import React from 'react';
import { Steps, Button, message } from 'antd';
import ContentHeader from '@/components/contentHeader';
import { SearchForm, SearchResult, SearchTransaction } from './components';

const { Step } = Steps;

const steps = [
  {
    title: '基本信息',
    content: SearchForm,
  },
  {
    title: '订单信息',
    content: SearchResult,
  },
  {
    title: '操作结果',
    content: SearchTransaction,
  },
];

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
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="查询" />
      <div className="main-container">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="tw-my-3">
          {React.createElement(steps[current].content)}
        </div>
        <div className="tw-my-3">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionSearchPage;
