import React from 'react';
import { List, Avatar, Divider, Tooltip } from 'antd';
import { Link } from 'umi';
import { ArrowRightOutlined } from '@ant-design/icons';
import ITransaction from '@/types/ITransaction';
import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_TEXT,
} from '@/configs/transaction';
import { COLOR } from '@/configs/enum';
import { formatDateTime, formatAmount } from '@/utils/formater';
import Decimal from '@/utils/decimal';
import DateTime from '@/utils/datetime';

interface IProps {
  data: {
    count: number;
    rows: Array<ITransaction>;
  };
  current: number;
  onPageChange: (page: number) => void;
}

const getAmountTransaction = (transactions: Array<any>) => {
  const amount = transactions.reduce((pre, item) => {
    return Decimal.add(pre, item.value);
  }, 0);

  return formatAmount(amount);
};

const getAmountRefund = (refund: any) => {
  const amount = refund ? Decimal.toFixed(refund.value, 2) : 0;
  return formatAmount(amount);
};

const ListTitle = (props: { data: ITransaction }) => {
  const { data } = props;
  return (
    <>
      <span>{formatAmount(data.coin_amount, data.coin_code)}</span>
      <Divider type="vertical" />
      <span>{formatAmount(data.amount, data.currency)}</span>
    </>
  );
};

const ListDescr = (props: { data: ITransaction }) => {
  const { data } = props;
  return (
    <>
      <div className="tw-hidden md:tw-block">
        <span>订单编号：</span>
        <span>{data.order_id}</span>
      </div>
      <Link
        to={`/transaction/list/${data.id}`}
        className="tw-block md:tw-hidden"
      >
        详情 <ArrowRightOutlined />
      </Link>
    </>
  );
};

const ListAvatar = (props: { data: ITransaction }) => {
  const { data } = props;
  let tooltipTitle = null;
  let avatarText = '';
  let avatarColor = '';

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
    tooltipTitle = (
      <>
        <div className="tw-whitespace-nowrap">
          支付状态：{TRANSACTION_STATUS_TEXT[data.status]}
        </div>
        <div>支付金额：{`${amountTransaction} ${data.coin_code}`}</div>
        <div>完成时间：{formatDateTime(data.status_time)}</div>
      </>
    );
    avatarText = '已完成';
    avatarColor = COLOR.GREEN;
  }

  if (data.status === TRANSACTION_STATUS.PARTIAL) {
    tooltipTitle = (
      <div>支付金额：{`${amountTransaction} ${data.coin_code}`}</div>
    );
    avatarText = '未足额';
    avatarColor = COLOR.RED;
  }

  if (data.status === TRANSACTION_STATUS.REFUND) {
    tooltipTitle = (
      <>
        <div>退款金额：{`${amountRefund} ${data.coin_code}`}</div>
        <div>
          提交时间：{formatDateTime(data.user_transaction_refund.create_time)}
        </div>
      </>
    );
    avatarText = '退款中';
    avatarColor = COLOR.PINK;
  }

  if (data.status === TRANSACTION_STATUS.REFUND_DONE) {
    tooltipTitle = (
      <>
        <div>退款金额：{`${amountRefund} ${data.coin_code}`}</div>
        <div>
          退款时间：{formatDateTime(data.user_transaction_refund.status_time)}
        </div>
      </>
    );
    avatarText = '已退款';
    avatarColor = COLOR.CYAN;
  }

  if (data.status === TRANSACTION_STATUS.NEW) {
    if (DateTime.isExpired(data.expire_time)) {
      tooltipTitle = (
        <div>过期时间：{`${formatDateTime(data.expire_time)}`}</div>
      );
      avatarText = '已过期';
      avatarColor = COLOR.YELLOW;
    } else {
      tooltipTitle = <div>等待用户支付</div>;
      avatarText = '未完成';
      avatarColor = COLOR.ORANGE;
    }
  }

  return (
    <Tooltip title={tooltipTitle} placement="right">
      <Avatar
        size={48}
        shape="square"
        style={{
          backgroundColor: avatarColor,
          verticalAlign: 'middle',
        }}
      >
        {avatarText}
      </Avatar>
    </Tooltip>
  );
};

const getListActions = (data: ITransaction) => {
  return [
    <Link to={`/transaction/list/${data.id}`} className="tw-hidden md:tw-block">
      详情 <ArrowRightOutlined />
    </Link>,
  ];
};

const ListData: React.FC<IProps> = (props) => {
  const { data, current, onPageChange } = props;
  const { rows, count } = data;

  return (
    <List
      dataSource={rows}
      pagination={
        rows && rows.length
          ? {
              pageSize: 10,
              total: count,
              current,
              showTotal: () => `共 ${count} 条记录`,
              onChange: onPageChange,
            }
          : false
      }
      renderItem={(item: ITransaction) => (
        <List.Item actions={getListActions(item)}>
          <List.Item.Meta
            avatar={<ListAvatar data={item} />}
            title={<ListTitle data={item} />}
            description={<ListDescr data={item} />}
          />
          <div
            className="tw-mr-10 tw-hidden 2xl:tw-block"
            style={{ width: 260 }}
          >
            <div className="tw-text-gray-500">产品名称：</div>
            <div
              style={{ width: 260 }}
              title={item.product_name}
              className="tw-whitespace-nowrap tw-overflow-ellipsis tw-overflow-hidden"
            >
              {item.product_name}
            </div>
          </div>
          <div
            className="tw-mr-10 tw-hidden 2xl:tw-block"
            style={{ width: 260 }}
          >
            <div className="tw-text-gray-500">用户编号：</div>
            <div
              style={{ width: 260 }}
              title={item.customer_id}
              className="tw-whitespace-nowrap tw-overflow-ellipsis tw-overflow-hidden"
            >
              {item.customer_id}
            </div>
          </div>
          <div className="tw-hidden sm:tw-block">
            <div className="tw-text-gray-500">创建时间：</div>
            <div>{formatDateTime(item.create_time)}</div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default React.memo(ListData);
