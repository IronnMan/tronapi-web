import React from 'react';
import { Divider, Spin } from 'antd';
import { useDispatch, useSelector } from 'umi';
import ContentHeader from '@/components/contentHeader';
import { UserModelState } from '@/models/user';
import { ListSearch, ListData } from './components';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/bill',
    breadcrumbName: '账单',
  },
];

const BillListPage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    dispatch({
      type: 'user/getBillList',
    });
  };

  const { bill_list: billList, bill_list_params: billParams }: UserModelState =
    useSelector((state: any) => state.user);

  const loading = useSelector(
    (state: any) => state.loading.effects['user/getBillList'],
  );

  const onPageChange = (pageIndex: number) => {
    dispatch({
      type: 'user/setBillListParams',
      payload: {
        page_index: pageIndex,
      },
    });
    fetchList();
  };

  const onSearchSubmit = (values: any) => {
    dispatch({
      type: 'user/setBillListParams',
      payload: {
        ...values,
        page_index: 1,
      },
    });
    fetchList();
  };

  const onSearchReset = () => {
    dispatch({
      type: 'user/resetBillListParams',
    });
    fetchList();
  };

  return (
    <>
      <ContentHeader breadcrumb={{ routes }} title="记录">
        账单金额 = 订单金额 * 账户费率
      </ContentHeader>
      <div className="main-container">
        <Spin size="large" spinning={loading}>
          <ListSearch
            data={billParams}
            onSubmit={onSearchSubmit}
            onReset={onSearchReset}
          />
          <ListData
            data={billList}
            current={billParams.page_index}
            onPageChange={onPageChange}
          />
        </Spin>
      </div>
    </>
  );
};

export default BillListPage;
