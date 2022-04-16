import React from 'react';
import { useModel } from 'umi';
import { Card, Statistic, Row, Col } from 'antd';
import { formatAmount } from '@/utils/formater';

interface IProps {}

const colProps = {
  xs: { span: 12 },
  md: { span: 12 },
  xl: { span: 4 },
};

const cardProps = {
  bordered: false,
  bodyStyle: { padding: 0 },
};

const ListStat: React.FC<IProps> = () => {
  const { initialState = {} } = useModel('@@initialState');
  const { currentUser = {} } = initialState;
  const { merchant_balance = {} } = currentUser;

  return (
    <Row gutter={[15, 15]}>
      <Col {...colProps}>
        <Card {...cardProps}>
          <Statistic
            title={'账户余额（USDT）'}
            value={formatAmount(merchant_balance.balance)}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default React.memo(ListStat);
