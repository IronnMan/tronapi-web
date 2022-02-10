import React from 'react';
import { useDispatch, useSelector } from 'umi';
import {
  Descriptions,
  Tag,
  Divider,
  Space,
  Button,
  Popconfirm,
  message,
} from 'antd';
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

const getAmountTransaction = (transactions: Array<any>) => {
  const amount = transactions
    ? transactions.reduce((pre, item) => {
        return Decimal.add(pre, item.value);
      }, 0)
    : 0;

  return formatAmount(amount);
};

const getAmountRefund = (refund: any) => {
  const amount = refund ? Decimal.toFixed(refund.value, 2) : 0;
  return formatAmount(amount);
};

const TransactionStatus = (props: { data: ITransaction }) => {
  const { data } = props;

  const amountTransaction = getAmountTransaction(data.transactions);
  const amountRefund = getAmountRefund(data.user_transaction_refund);

  if (
    [
      TRANSACTION_STATUS.NORMAL_DONE,
      TRANSACTION_STATUS.PARTIAL_DONE,
      TRANSACTION_STATUS.PARTIAL_OVER_DONE,
      TRANSACTION_STATUS.OVER_DONE,
      TRANSACTION_STATUS.MANUAL_DONE,
    ].includes(data.status)
  ) {
    return (
      <Space>
        <Tag icon={<CheckCircleOutlined />} color={COLOR.GREEN}>
          {TRANSACTION_STATUS_TEXT[data.status]}
        </Tag>
        <Tag color={COLOR.GRAY}>
          实付金额：{`${amountTransaction} ${data.coin_code}`}
        </Tag>
        <Tag color={COLOR.YELLOW}>
          支付时间：{formatDateTime(data.status_time)}
        </Tag>
        <a
          href={`${TRON_BROWSER[data.coin_code]}/transaction/${
            data.transactions[0].hash
          }`}
          target="_blank"
        >
          查看交易详情 <ArrowRightOutlined />
        </a>
      </Space>
    );
  }

  if (data.status === TRANSACTION_STATUS.PARTIAL) {
    return (
      <Space>
        <Tag icon={<WarningOutlined />} color={COLOR.YELLOW}>
          {TRANSACTION_STATUS_TEXT[data.status]}
        </Tag>
        <Tag color={COLOR.GRAY}>
          实付金额：{`${amountTransaction} ${data.coin_code}`}
        </Tag>
        {data.transactions.length ? (
          <a
            href={`${TRON_BROWSER[data.coin_code]}/transaction/${
              data.transactions[0].hash
            }`}
            target="_blank"
          >
            查看交易详情 <ArrowRightOutlined />
          </a>
        ) : null}
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
            {TRANSACTION_STATUS_TEXT[data.status]}
          </Tag>
        </Space>
      );
    }
  }

  return <span>-</span>;
};

const TransactionFooter = (props: { data: ITransaction }) => {
  const { data } = props;
  if (data.status === TRANSACTION_STATUS.PARTIAL) {
    return (
      <>
        <Divider dashed />
        <div>
          <h3>说明</h3>
          <h4>关于标记完成</h4>
          <ol>
            <li>
              手动标记完成操作，仅针对用户支付金额小于订单支付金额的情况。
            </li>
            <li>
              该操作会将订单标记为已完成状态，同时向商户发送订单关联的回调通知，商户钱包的余额也会相应增加。
            </li>
            <li>
              商户可前往设置页面，针对用户支付金额小于订单支付金额的情况，开启自动标记完成的配置。
            </li>
          </ol>
          <h4>关于退款</h4>
          <ol>
            <li>退款操作仅针对用户支付金额小于订单支付金额的情况。</li>
            <li>退款操作会将用户实际支付金额，原路返回关联交易的发送地址。</li>
            <li>
              商户可前往设置页面，针对用户支付金额小于订单支付金额的情况，开启自动退款的配置。
            </li>
          </ol>
        </div>
      </>
    );
  }

  return null;
};

const TransactionMeta: React.FC<IProps> = (props) => {
  const { data, onActionDone } = props;

  const dispatch = useDispatch();

  const onMarkDone = async () => {
    const res: any = await dispatch({
      type: 'transaction/markDone',
      payload: {
        id: data.id,
      },
    });

    if (res && res.success === true) {
      message.success(res.data);
      onActionDone && onActionDone();
    }
  };

  const onMarkRefund = async () => {
    const res: any = await dispatch({
      type: 'transaction/markRefund',
      payload: {
        id: data.id,
      },
    });

    if (res && res.success === true) {
      message.success(res.data);
      onActionDone && onActionDone();
    }
  };

  const loadingMarkDone = useSelector(
    (state: any) => state.loading.effects['transaction/markDone'],
  );

  const loadingMarkRefund = useSelector(
    (state: any) => state.loading.effects['transaction/markRefund'],
  );

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
        <Descriptions.Item label="创建时间">
          {formatDateTime(data.create_time) || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="订单状态">
          <TransactionStatus data={data} />
        </Descriptions.Item>
        {data.status === TRANSACTION_STATUS.PARTIAL && (
          <Descriptions.Item label="操作">
            <Space>
              <Popconfirm
                title="确定要将订单标记为已完成状态吗？"
                onConfirm={onMarkDone}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" loading={loadingMarkDone}>
                  标记完成
                </Button>
              </Popconfirm>
              <Popconfirm
                title="确定要对订单进行退款处理吗？"
                onConfirm={onMarkRefund}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" danger loading={loadingMarkRefund}>
                  退款
                </Button>
              </Popconfirm>
            </Space>
          </Descriptions.Item>
        )}
      </Descriptions>

      <TransactionFooter data={data} />
    </>
  );
};

export default React.memo(TransactionMeta);
