import React from 'react';
import { useSelector, useModel } from 'umi';
import { Button, Badge } from 'antd';
import { usePageContext } from '@/hooks/usePageContext';
import { UserModelState } from '@/models/user';
import {
  ArrowRightOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Decimal from '@/utils/decimal';
import { formatAmount } from '@/utils/formater';
interface IProps {
  onClick: () => void;
}

const WithdrawalAction: React.FC<IProps> = (props) => {
  const { onClick } = props;
  const { coinCode } = usePageContext();
  const { initialState } = useModel('@@initialState');
  const { currentUser = {}, settings = {} } = initialState!;
  const { user_config = {} } = currentUser;
  const { config }: any = settings;
  const { wallet }: UserModelState = useSelector((state: any) => state.user);
  const { withdrawal_auto_enabled } = user_config;

  if (withdrawal_auto_enabled === true) {
    return (
      <Button type="primary" danger>
        <Badge status="success" />
        已开启自动提现
      </Button>
    );
  }

  if (Decimal.lessThan(wallet.coin_amount, config.user_withdrawal_min_amount)) {
    return (
      <Button type="primary" danger>
        <ExclamationCircleOutlined />
        {`最低提现金额：${formatAmount(
          config.user_withdrawal_min_amount,
          coinCode,
        )}`}
      </Button>
    );
  }

  return (
    <Button type="primary" danger onClick={onClick}>
      提现 <ArrowRightOutlined />
    </Button>
  );
};

export default React.memo(WithdrawalAction);
