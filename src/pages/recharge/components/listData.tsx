import React from 'react';
import { Table, Pagination } from 'antd';
import IRecharge from '@/types/IRecharge';
import { formatAmount } from '@/utils/formater';
import { ArrowRightOutlined } from '@ant-design/icons';

interface IProps {
  data: {
    count: number;
    rows: Array<IRecharge>;
  };
  current: number;
  onPageChange: (page: number) => void;
}

const columns = [
  {
    title: '充值金额（USDT）',
    dataIndex: 'amount',
    key: 'amount',
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
    title: '充值时间',
    dataIndex: 'status_time',
    key: 'status_time',
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    render: (val: any, data: any) => {
      return (
        <a>
          详情 <ArrowRightOutlined />
        </a>
      );
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
