import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Spin } from 'antd';
import { Links, Stat, Account, Notice } from './components';
import { UserModelState } from '@/models/user';
import { SystemModelState } from '@/models/system';
import { TransactionModelState } from '@/models/transaction';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchNotice();
    fetchStat();
  }, []);

  const fetchStat = () => {
    dispatch({
      type: 'transaction/getStatOverview',
    });
  };

  const fetchNotice = () => {
    dispatch({
      type: 'system/getNotice',
    });
  };

  const { balance }: UserModelState = useSelector((state: any) => state.user);
  const { notice }: SystemModelState = useSelector(
    (state: any) => state.system,
  );
  const { data_stat_overview }: TransactionModelState = useSelector(
    (state: any) => state.transaction,
  );

  const loadingWallet = useSelector(
    (state: any) => state.loading.effects['user/getWallet'],
  );

  const loadingNotice = useSelector(
    (state: any) => state.loading.effects['system/getNotice'],
  );

  const loadingStat = useSelector(
    (state: any) => state.loading.effects['transaction/getStatOverview'],
  );

  return (
    <div className="ghost-container">
      <Spin size="large" spinning={loadingWallet || loadingStat}>
        <Notice data={notice} loading={loadingNotice} />
        <Account data={balance} loading={loadingWallet} />
        <Stat data={data_stat_overview} loading={loadingStat} />
        <Links />
      </Spin>
    </div>
  );
};

export default HomePage;
