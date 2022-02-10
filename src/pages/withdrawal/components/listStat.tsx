import React from 'react';
import { useSelector, useModel } from 'umi';
import { Card, Statistic, Row, Col } from 'antd';
import { usePageContext } from '@/hooks/usePageContext';
import { formatAmount } from '@/utils/formater';
import { UserModelState } from '@/models/user';

interface IProps {
  data: any;
}

const colProps = {
  xs: { span: 12 },
  md: { span: 12 },
  xl: { span: 4 },
};

const cardProps = {
  bordered: false,
  bodyStyle: { padding: 0 },
};

const ListStat: React.FC<IProps> = (props) => {
  const { coinCode } = usePageContext();
  const { data } = props;
  const { wallet }: UserModelState = useSelector((state: any) => state.user);

  const { initialState = {} } = useModel('@@initialState');
  const { currentUser = {} } = initialState;
  const { user_config = {} } = currentUser;

  return (
    <Row gutter={[15, 15]}>
      <Col {...colProps}>
        <Card {...cardProps}>
          <Statistic
            title={`累计提现金额（${coinCode}）`}
            value={formatAmount(data.doneAmount)}
          />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card {...cardProps}>
          <Statistic title="累计提现笔数（笔）" value={data.doneCount} />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card {...cardProps}>
          <Statistic
            title={`账户余额（${coinCode}）`}
            value={formatAmount(wallet.coin_amount)}
          />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card {...cardProps}>
          <Statistic title="账户费率" value={`${user_config.rate * 100}%`} />
        </Card>
      </Col>
    </Row>
  );
};

export default React.memo(ListStat);
