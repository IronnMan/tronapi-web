import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Spin } from 'antd';
import ContentHeader from '@/components/contentHeader';
import { ChartOverview, ChartAmount, ChartCount } from './components';
import { TransactionModelState } from '@/models/transaction';

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
    breadcrumbName: '统计',
  },
];

const TransactionReportPage: React.FC<any> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch({
      type: 'transaction/getStatOverview',
    });

    dispatch({
      type: 'transaction/getStatChart',
    });
  };

  const {
    data_stat_overview: transactionStatOverview,
    data_stat_chart: transactionStatChart,
  }: TransactionModelState = useSelector((state: any) => state.transaction);

  const loadingOverview = useSelector(
    (state: any) => state.loading.effects['transaction/getStatOverview'],
  );

  const loadingChart = useSelector(
    (state: any) => state.loading.effects['transaction/getStatChart'],
  );

  const {
    count: transactionStatChartCount,
    amount: transactionStatChartAmount,
  } = transactionStatChart;

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="统计" />
      <div className="ghost-container">
        <Spin size="large" spinning={loadingOverview || loadingChart}>
          <ChartOverview data={transactionStatOverview} />
          <ChartAmount data={transactionStatChartAmount} />
          <ChartCount data={transactionStatChartCount} />
        </Spin>
      </div>
    </>
  );
};

export default TransactionReportPage;
