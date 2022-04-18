import React, { useState } from 'react';
import { useModel } from 'umi';
import { Card, Button, Row, Col, Statistic } from 'antd';
import { formatAmount } from '@/utils/formater';
import { ArrowRightOutlined } from '@ant-design/icons';
import { FormCreate } from '@/pages/recharge/components';

const colProps = {
  xs: { span: 24 },
  md: { span: 12 },
  xl: { span: 6 },
};

const cardProps = {
  bordered: false,
  bodyStyle: { padding: 0 },
};
interface IProps {}

const Account: React.FC<IProps> = (props) => {
  const [formVisible, setFormVisible] = useState(false);

  const { initialState = {}, setInitialState } = useModel('@@initialState');
  const { currentUser = {} } = initialState;
  const { merchant_config = {}, merchant_balance = {} } = currentUser;

  const fetchAccount = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const onRechargeSuccess = () => {
    fetchAccount();
  };

  const onRechargeCancel = () => {
    setFormVisible(false);
  };

  const onRechargeClick = () => {
    setFormVisible(true);
  };

  return (
    <>
      <Card title="账户" bordered={false} className="tw-mb-3">
        <Row gutter={[15, 25]}>
          <Col {...colProps}>
            <Card {...cardProps}>
              <Statistic
                title={'余额'}
                value={formatAmount(merchant_balance.balance)}
              />
              <Button onClick={onRechargeClick} danger className="tw-mt-3">
                充值 <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
          <Card {...cardProps}>
            <Statistic title="费率" value={`${merchant_config.rate * 100}%`} />
          </Card>
        </Row>
      </Card>

      <FormCreate
        visible={formVisible}
        onSuccess={onRechargeSuccess}
        onCancel={onRechargeCancel}
      />
    </>
  );
};

export default React.memo(Account);
