import React from 'react';
import { Tabs, Spin } from 'antd';
import { history, useDispatch, useSelector, useParams } from 'umi';
import ContentHeader from '@/components/contentHeader';
import { WithdrawalMeta, WithdrawalWebhook } from './components';

const routes = [
  {
    path: '/',
    breadcrumbName: '首页',
  },
  {
    path: '/withdrawal/list',
    breadcrumbName: '提现',
  },
  {
    path: '',
    breadcrumbName: '详情',
  },
];

const WithdrawalDetailPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();

  React.useEffect(() => {
    fetchDetail();

    return () => {
      dispatch({
        type: 'withdrawal/resetDetail',
      });
    };
  }, [id]);

  const fetchDetail = () => {
    dispatch({
      type: 'withdrawal/getDetail',
      payload: {
        id,
      },
    });
  };

  const { data_detail: withdrawalDetail } = useSelector(
    (state: any) => state.withdrawal,
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['withdrawal/getDetail'],
  );

  const webhookTabVisible = React.useMemo(() => {
    return (
      withdrawalDetail &&
      withdrawalDetail.user_withdrawal_webhooks &&
      withdrawalDetail.user_withdrawal_webhooks.length
    );
  }, [withdrawalDetail]);

  return (
    <>
      <ContentHeader
        breadcrumb={{ routes }}
        title="详情"
        subTitle={withdrawalDetail.name}
        onBack={() => history.push(`/withdrawal/list`)}
      />
      <div className="main-container">
        <Spin size="large" spinning={loading}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="提现信息" key="1">
              <WithdrawalMeta data={withdrawalDetail} />
            </Tabs.TabPane>
            {webhookTabVisible && (
              <Tabs.TabPane tab="回调信息" key="2">
                <WithdrawalWebhook data={withdrawalDetail} />
              </Tabs.TabPane>
            )}
          </Tabs>
        </Spin>
      </div>
    </>
  );
};

export default WithdrawalDetailPage;
