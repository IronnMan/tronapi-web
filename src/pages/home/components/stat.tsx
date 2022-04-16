import React from 'react';
import { useModel } from 'umi';
import { Card, Statistic, Row, Col } from 'antd';
import { formatAmount } from '@/utils/formater';

interface IProps {
  data: any;
  loading: boolean;
}

const colProps = {
  xs: { span: 24 },
  md: { span: 12 },
  xl: { span: 6 },
};

const cardProps = {
  bordered: false,
  bodyStyle: { padding: 0 },
};

const Stat: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <Card title="订单" bordered={false} className="tw-mb-3">
      <Row gutter={[15, 25]}>
        <Col {...colProps}>
          <Card {...cardProps}>
            <Statistic
              title={'今日成交金额（USDT）'}
              value={formatAmount(data.dayDoneAmount)}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card {...cardProps}>
            <Statistic title="今日成交笔数（笔）" value={data.dayDoneCount} />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card {...cardProps}>
            <Statistic
              title={'累计成交金额（USDT）'}
              value={formatAmount(data.allDoneAmount)}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card {...cardProps}>
            <Statistic title="累计成交笔数（笔）" value={data.allDoneCount} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default React.memo(Stat);
