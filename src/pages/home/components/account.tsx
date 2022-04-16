import React from 'react';
import { useModel } from 'umi';
import { Card, Avatar, Button, Row, Col, Statistic } from 'antd';
import { formatAmount } from '@/utils/formater';
import { ArrowRightOutlined } from '@ant-design/icons';

const colProps = {
  xs: { span: 24 },
  md: { span: 12 },
  xl: { span: 6 },
};

const cardProps = {
  bordered: false,
  bodyStyle: { padding: 0 },
};
interface IProps {
  data: any;
  loading: boolean;
}

const Account: React.FC<IProps> = (props) => {
  const { data } = props;

  const { initialState = {} } = useModel('@@initialState');
  const { currentUser = {} } = initialState;
  const { merchant_config = {}, merchant_balance = {} } = currentUser;

  return (
    <>
      <Card title="账户" bordered={false} className="tw-mb-3">
        <Row gutter={[15, 25]}>
          <Col {...colProps}>
            <Card {...cardProps}>
              <Statistic
                title={'账户余额'}
                value={formatAmount(merchant_balance.balance)}
              />
              <Button danger className="tw-mt-3">
                充值 <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
          <Card {...cardProps}>
            <Statistic
              title="账户费率"
              value={`${merchant_config.rate * 100}%`}
            />
          </Card>
        </Row>
      </Card>
    </>
  );
};

export default React.memo(Account);
