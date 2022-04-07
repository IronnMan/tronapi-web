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
import Decimal from '@/utils/decimal';
import DateTime from '@/utils/datetime';

import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_TEXT,
} from '@/configs/transaction';

import { TRON_BROWSER } from '@/configs/tron';

interface IProps {
  data: ITransaction;
  onActionDone?: () => void;
}

const getAmountRefund = (refund: any) => {
  const amount = refund ? Decimal.toFixed(refund.value, 2) : 0;
  return formatAmount(amount);
};

const TransactionStatus = (props: { data: ITransaction }) => {
  const { data } = props;

  const amountRefund = getAmountRefund(data.user_transaction_refund);

  if ([TRANSACTION_STATUS.DONE].includes(data.status)) {
    return (
      <Space>
        <Tag icon={<CheckCircleOutlined />} color={COLOR.GREEN}>
          {TRANSACTION_STATUS_TEXT[data.status]}
        </Tag>
        <Tag color={COLOR.GRAY}>
          支付金额：{`${formatAmount(data.coin_amount)} ${data.coin_code}`}
        </Tag>
        <Tag color={COLOR.YELLOW}>
          支付时间：{formatDateTime(data.status_time)}
        </Tag>
        <a
          href={`${TRON_BROWSER[data.coin_code]}/#/transaction/${
            data.transaction_hash
          }`}
          target="_blank"
        >
          交易详情 <ArrowRightOutlined />
        </a>
      </Space>
    );
  }

  if (data.status === TRANSACTION_STATUS.REFUND) {
    return (
      <Space>
        <Tag icon={<WarningOutlined />} color={COLOR.PINK}>
          {TRANSACTION_STATUS_TEXT[data.status]}
        </Tag>
        <Tag color={COLOR.GRAY}>
          退款金额：{`${amountRefund} ${data.coin_code}`}
        </Tag>
      </Space>
    );
  }

  if (data.status === TRANSACTION_STATUS.REFUND_DONE) {
    return (
      <Space>
        <Tag icon={<CheckCircleOutlined />} color={COLOR.CYAN}>
          {TRANSACTION_STATUS_TEXT[data.status]}
        </Tag>
        <Tag color={COLOR.GRAY}>
          退款金额：{`${amountRefund} ${data.coin_code}`}
        </Tag>
        <Tag color={COLOR.YELLOW}>
          {formatDateTime(data.user_transaction_refund.status_time)}
        </Tag>
      </Space>
    );
  }

  if (data.status === TRANSACTION_STATUS.NEW) {
    if (DateTime.isExpired(data.expire_time)) {
      return (
        <Space>
          <Tag icon={<WarningOutlined />} color={COLOR.YELLOW}>
            {TRANSACTION_STATUS_TEXT[TRANSACTION_STATUS.EXPIRED]}
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
            {TRANSACTION_STATUS_TEXT[data.status]}
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
          {data.coin_amount
            ? formatAmount(data.coin_amount, data.coin_code)
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="收款地址">
          {data.coin_address ? (
            <a
              href={`${TRON_BROWSER[data.coin_code]}/#/address/${
                data.coin_address
              }`}
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
