import React from 'react';
import { Link } from 'umi';
import { List, Avatar, Space, Tooltip } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import IWithdrawal from '@/types/IWithdrawal';
import { TRON_BROWSER } from '@/configs/tron';
import { WITHDRAWAL_TYPE_TEXT } from '@/configs/withdrawal';
import { formatAmount, formatDateTime } from '@/utils/formater';

interface IProps {
  data: {
    count: number;
    rows: Array<IWithdrawal>;
  };
  current: number;
  onPageChange: (page: number) => void;
}

const ListTitle = (props: { data: IWithdrawal }) => {
  const { data } = props;
  return (
    <Space>
      <Link to={`/withdrawal/list/${data.id}`}>
        {formatAmount(data.amount_send, data.coin_code)}
      </Link>
    </Space>
  );
};

const ListDescr = (props: { data: IWithdrawal }) => {
  const { data } = props;
  return (
    <>
      <span className="tw-hidden lg:tw-block">
        接收地址：
        <a
          href={`${TRON_BROWSER[data.coin_code]}/#/address/${data.address}`}
          target="_blank"
        >
          {data.address}
        </a>
      </span>
      <Link
        to={`/withdrawal/list/${data.id}`}
        className="tw-block lg:tw-hidden"
      >
        详情 <ArrowRightOutlined />
      </Link>
    </>
  );
};

const ListAvatar = (props: { data: IWithdrawal }) => {
  const { data } = props;
  if (data.status === 'DONE') {
    const title = (
      <>
        <div>发送金额：{formatAmount(data.amount_send, data.coin_code)}</div>
        <div>发送时间：{formatDateTime(data.status_time)}</div>
      </>
    );
    return (
      <Tooltip title={title} placement="right">
        <Avatar
          size={48}
          shape="square"
          style={{
            backgroundColor: '#33CC66',
            verticalAlign: 'middle',
          }}
        >
          已完成
        </Avatar>
      </Tooltip>
    );
  }

  const title = <div>系统处理中</div>;

  return (
    <Tooltip title={title} placement="right">
      <Avatar
        size={48}
        shape="square"
        style={{
          backgroundColor: '#FF9966',
          verticalAlign: 'middle',
        }}
      >
        处理中
      </Avatar>
    </Tooltip>
  );
};

const getListActions = (data: IWithdrawal) => {
  return [
    <Link to={`/withdrawal/list/${data.id}`} className="tw-hidden lg:tw-block">
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
      renderItem={(item: IWithdrawal) => (
        <List.Item actions={getListActions(item)}>
          <List.Item.Meta
            avatar={<ListAvatar data={item} />}
            title={<ListTitle data={item} />}
            description={<ListDescr data={item} />}
          />
          <div
            className="tw-mr-10 tw-hidden 2xl:tw-block"
            style={{ width: 140 }}
          >
            <div className="tw-text-gray-500">申请金额</div>
            <div>{formatAmount(item.amount_submit, item.coin_code)}</div>
          </div>
          <div
            className="tw-mr-10 tw-hidden 2xl:tw-block"
            style={{ width: 100 }}
          >
            <div className="tw-text-gray-500">账户费率</div>
            <div>{`${item.rate * 100}%`}</div>
          </div>
          <div
            className="tw-mr-10 tw-hidden 2xl:tw-block"
            style={{ width: 100 }}
          >
            <div className="tw-text-gray-500">操作方式</div>
            <div>{WITHDRAWAL_TYPE_TEXT[item.type]}</div>
          </div>
          <div className="tw-hidden sm:tw-block">
            <div className="tw-text-gray-500">创建时间</div>
            <div>{formatDateTime(item.create_time)}</div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default React.memo(ListData);
