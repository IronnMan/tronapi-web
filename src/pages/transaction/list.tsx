import React from 'react';
import { Divider, Spin } from 'antd';
import { useDispatch, useSelector } from 'umi';
import ContentHeader from '@/components/contentHeader';
import { TransactionModelState } from '@/models/transaction';
import { ListSearch, ListData } from './components';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/transaction/list',
    breadcrumbName: '订单',
  },
];

const TransactionListPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    dispatch({
      type: 'transaction/getList',
    });
  };

  const {
    data_list: transactionList,
    data_list_params: transactionParams,
  }: TransactionModelState = useSelector((state: any) => state.transaction);

  const loading = useSelector(
    (state: any) => state.loading.effects['transaction/getList'],
  );

  const onPageChange = (pageIndex: number) => {
    dispatch({
      type: 'transaction/setListParams',
      payload: {
        page_index: pageIndex,
      },
    });
    fetchList();
  };

  const onSearchSubmit = (values: any) => {
    dispatch({
      type: 'transaction/setListParams',
      payload: {
        ...values,
        page_index: 1,
      },
    });
    fetchList();
  };

  const onSearchReset = () => {
    dispatch({
      type: 'transaction/resetListParams',
    });
    fetchList();
  };

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="列表" />
      <div className="main-container">
        <Spin size="large" spinning={loading}>
          <ListSearch
            data={transactionParams}
            onSubmit={onSearchSubmit}
            onReset={onSearchReset}
          />
          <Divider dashed style={{ margin: '8px 0' }} />
          <ListData
            data={transactionList}
            current={transactionParams.page_index}
            onPageChange={onPageChange}
          />
        </Spin>
      </div>
    </>
  );
};

export default TransactionListPage;
