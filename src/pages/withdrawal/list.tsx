import React from 'react';
import { useDispatch, useSelector, history } from 'umi';
import { Button, Divider, Spin } from 'antd';
import { WithdrawalModelState } from '@/models/withdrawal';
import ContentHeader from '@/components/contentHeader';
import { usePageContext } from '@/hooks/usePageContext';
import { SETTING_TYPE } from '@/configs/setting';
import {
  ListSearch,
  ListData,
  ListStat,
  WithdrawalForm,
  WithdrawalAction,
} from './components';

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
    breadcrumbName: '列表',
  },
];

const WithdrawalListPage: React.FC<any> = () => {
  const { coinCode } = usePageContext();
  const dispatch = useDispatch();
  const coinCodeRef = React.useRef(coinCode);
  coinCodeRef.current = coinCode;

  const [withdrawalVisible, setWithdrawalVisible] = React.useState(false);

  React.useEffect(() => {
    fetchStat();
    fetchList();
  }, [coinCode]);

  const fetchList = () => {
    dispatch({
      type: 'withdrawal/getList',
      payload: {
        coin_code: coinCodeRef.current,
      },
    });
  };

  const fetchStat = () => {
    dispatch({
      type: 'withdrawal/getStatOverview',
      payload: {
        coin_code: coinCodeRef.current,
      },
    });
  };

  const {
    data_list: withdrawalList,
    data_stat_overview: withdrawalStatOverview,
    data_list_params: withdrawalParams,
  }: WithdrawalModelState = useSelector((state: any) => state.withdrawal);

  const loadingList = useSelector(
    (state: any) => state.loading.effects['withdrawal/getList'],
  );

  const loadingStatOverview = useSelector(
    (state: any) => state.loading.effects['withdrawal/getStatOverview'],
  );

  const onPageChange = (pageIndex: number) => {
    dispatch({
      type: 'withdrawal/setListParams',
      payload: {
        page_index: pageIndex,
      },
    });
    fetchList();
  };

  const onSearchSubmit = (values: any) => {
    dispatch({
      type: 'withdrawal/setListParams',
      payload: {
        ...values,
        page_index: 1,
      },
    });
    fetchList();
  };

  const onSearchReset = () => {
    dispatch({
      type: 'withdrawal/resetListParams',
    });
    fetchList();
  };

  return (
    <Spin size="large" spinning={loadingList || loadingStatOverview}>
      <ContentHeader
        breadcrumb={{ routes }}
        title="列表"
        extra={[
          <WithdrawalAction
            key="withdrawal"
            onClick={() => setWithdrawalVisible(true)}
          />,
          <Button
            onClick={() =>
              history.push(`/setting?tab=${SETTING_TYPE.WITHDRAWAL}`)
            }
            key="setting"
          >
            设置
          </Button>,
        ]}
      >
        <ListStat data={withdrawalStatOverview} />
      </ContentHeader>
      <div className="main-container">
        <ListSearch
          data={withdrawalParams}
          onSubmit={onSearchSubmit}
          onReset={onSearchReset}
        />

        <Divider dashed style={{ margin: '8px 0' }} />
        <ListData
          data={withdrawalList}
          current={withdrawalParams.page_index}
          onPageChange={onPageChange}
        />
      </div>
      <WithdrawalForm
        visible={withdrawalVisible}
        onCancel={() => setWithdrawalVisible(false)}
      />
    </Spin>
  );
};

export default WithdrawalListPage;
