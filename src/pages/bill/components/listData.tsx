import React from 'react';
import { Table, Pagination } from 'antd';
import IBill from '@/types/IBill';
import { formatAmount } from '@/utils/formater';

interface IProps {
  data: {
    count: number;
    rows: Array<IBill>;
  };
  current: number;
  onPageChange: (page: number) => void;
}

const columns = [
  {
    title: '账单时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '账单金额（USDT）',
    dataIndex: 'amount_fee',
    key: 'amount_fee',
    render: (val: any) => {
      return formatAmount(val, '');
    },
  },
  {
    title: '订单金额（USDT）',
    dataIndex: 'amount_transaction',
    key: 'amount_transaction',
    render: (val: any) => {
      return formatAmount(val, '');
    },
  },
  {
    title: '账户余额（USDT）',
    dataIndex: 'balance',
    key: 'balance',
    render: (val: any) => {
      return formatAmount(val, '');
    },
  },
  {
    title: '费率',
    dataIndex: 'rate',
    key: 'rate',
    render: (val: any) => {
      return `${val * 100}%`;
    },
  },
];

const ListData: React.FC<IProps> = (props) => {
  const { data, current, onPageChange } = props;
  const { rows, count } = data;

  return (
    <>
      <Table dataSource={data.rows} columns={columns} pagination={false} />
      {rows && rows.length ? (
        <Pagination
          className="tw-mt-4 tw-text-right"
          current={current}
          pageSize={10}
          size="default"
          total={count}
          showTotal={() => `共 ${count} 条记录`}
          onChange={onPageChange}
        />
      ) : null}
    </>
  );
};

export default React.memo(ListData);
