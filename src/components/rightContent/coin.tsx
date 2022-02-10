import React from 'react';
import { Switch } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { COIN_TYPE } from '@/configs/enum';

const CoinSwitcher: React.FC = () => {
  const dispatch = useDispatch();

  const onChange = (e: boolean) => {
    dispatch({
      type: 'system/setCoinCode',
      payload: e,
    });
  };

  const { coin_code } = useSelector((state: any) => state.system);

  return (
    <div>
      <Switch
        checkedChildren="已切换为测试币"
        defaultChecked={coin_code === COIN_TYPE.FAU}
        onChange={onChange}
        unCheckedChildren="点击切换测试币"
      />
    </div>
  );
};
export default CoinSwitcher;
