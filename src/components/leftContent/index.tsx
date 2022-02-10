import React from 'react';
import { Switch } from 'antd';
import { COIN_TYPE } from '@/configs/enum';
import { useDispatch, useSelector } from 'umi';
import Storage from '@/utils/storage';
import { STORAGE_KEY } from '@/configs';

const GlobalHeaderLeft: React.FC = () => {
  const dispatch = useDispatch();
  const { coin_code } = useSelector((state: any) => state.system);

  React.useEffect(() => {
    fetchWallet(coin_code);
  }, []);

  const fetchWallet = (coin_code: COIN_TYPE) => {
    dispatch({
      type: 'user/getWallet',
      payload: {
        coin_code,
      },
    });
  };

  const onChange = React.useCallback(async (checked: boolean) => {
    const coinCode = checked ? COIN_TYPE.FAU : COIN_TYPE.USDT;
    dispatch({
      type: 'system/setCoinCode',
      payload: coinCode,
    });
    fetchWallet(coinCode);
    Storage.setItem(STORAGE_KEY.COINCODE, coinCode);
  }, []);

  return (
    <div className="tw-ml-2">
      <Switch
        onChange={onChange}
        defaultChecked={coin_code === COIN_TYPE.FAU}
        checkedChildren={COIN_TYPE.FAU}
        unCheckedChildren={COIN_TYPE.FAU}
      />
    </div>
  );
};
export default GlobalHeaderLeft;
