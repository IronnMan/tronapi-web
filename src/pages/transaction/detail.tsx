import React from 'react';
import { Tabs, Spin } from 'antd';
import { history, useDispatch, useSelector, useParams } from 'umi';
import ContentHeader from '@/components/contentHeader';
import {
  TransactionMeta,
  TransactionWebhook,
  TransactionRefund,
} from './components';

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
    breadcrumbName: '详情',
  },
];

const TransactionDetailPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();

  React.useEffect(() => {
    fetchDetail();

    return () => {
      dispatch({
        type: 'transaction/resetDetail',
      });
    };
  }, [id]);

  const fetchDetail = () => {
    dispatch({
      type: 'transaction/getDetail',
      payload: {
        id,
      },
    });
  };

  const { data_detail: transactionDetail } = useSelector(
    (state: any) => state.transaction,
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['transaction/getDetail'],
  );

  const webhookTabVisible = React.useMemo(() => {
    return (
      transactionDetail &&
      transactionDetail.user_transaction_webhooks &&
      transactionDetail.user_transaction_webhooks.length
    );
  }, [transactionDetail]);

  const refundTabVisible = React.useMemo(() => {
    return transactionDetail && transactionDetail.user_transaction_refund;
  }, [transactionDetail]);

  return (
    <>
      <ContentHeader
        breadcrumb={{ routes }}
        title="详情"
        onBack={() => history.push(`/transaction/list`)}
      />
      <div className="main-container">
        <Spin size="large" spinning={loading}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="订单信息" key="1">
              <TransactionMeta
                data={transactionDetail}
                onActionDone={fetchDetail}
              />
            </Tabs.TabPane>
            {webhookTabVisible && (
              <Tabs.TabPane tab="回调信息" key="2">
                <TransactionWebhook data={transactionDetail} />
              </Tabs.TabPane>
            )}
            {refundTabVisible && (
              <Tabs.TabPane tab="退款信息" key="3">
                <TransactionRefund data={transactionDetail} />
              </Tabs.TabPane>
            )}
          </Tabs>
        </Spin>
      </div>
    </>
  );
};

export default TransactionDetailPage;
