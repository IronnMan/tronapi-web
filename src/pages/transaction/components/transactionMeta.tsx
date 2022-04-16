import React from 'react';
import { Descriptions, Tag, Space } from 'antd';
import ITransaction from '@/types/ITransaction';
import { formatAmount, formatDateTime } from '@/utils/formater';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { COLOR } from '@/configs/enum';
import { LINK } from '@/configs/links';
import DateTime from '@/utils/datetime';

interface IProps {
  data: ITransaction;
  onActionDone?: () => void;
}

const TransactionStatus = (props: { data: ITransaction }) => {
  const { data } = props;

  if (data.status === true) {
    return (
      <Space>
        <Tag icon={<CheckCircleOutlined />} color={COLOR.GREEN}>
          已支付
        </Tag>
        <Tag color={COLOR.GRAY}>
          支付金额：{`${formatAmount(data.coin_amount)}`}
        </Tag>
        <Tag color={COLOR.YELLOW}>
          支付时间：{formatDateTime(data.status_time)}
        </Tag>
        <a
          href={`${LINK.BROWSER}/#/transaction/${data.transaction_hash}`}
          target="_blank"
        >
          交易详情 <ArrowRightOutlined />
        </a>
      </Space>
    );
  }

  if (data.status === false) {
    if (DateTime.isExpired(data.expire_time)) {
      return (
        <Space>
          <Tag icon={<WarningOutlined />} color={COLOR.YELLOW}>
            已过期
          </Tag>
          <Tag color={COLOR.GRAY}>
            过期时间：{formatDateTime(data.expire_time)}
          </Tag>
        </Space>
      );
    } else {
      return (
        <Space>
          <Tag icon={<WarningOutlined />} color={COLOR.ORANGE}>
            未支付
          </Tag>
        </Space>
      );
    }
  }

  return <span>-</span>;
};

const TransactionMeta: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <>
      <Descriptions
        layout="horizontal"
        column={1}
        bordered
        size="middle"
        labelStyle={{ width: '150px' }}
      >
        <Descriptions.Item label="订单编号">
          {data.order_id || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="产品名称">
          {data.product_name || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="用户编号">
          {data.customer_id || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="订单金额">
          {data.amount ? formatAmount(data.amount, data.currency) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="支付金额">
          {data.coin_amount ? formatAmount(data.coin_amount) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="收款地址">
          {data.coin_address ? (
            <a
              href={`${LINK.BROWSER}/#/address/${data.coin_address}`}
              target="_blank"
            >
              {data.coin_address}
            </a>
          ) : (
            '-'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {formatDateTime(data.create_time) || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="订单状态">
          <TransactionStatus data={data} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default React.memo(TransactionMeta);
