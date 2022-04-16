import React from 'react';
import { Table, Pagination, Badge } from 'antd';
import IAddress from '@/types/IAddress';
import { formatAmount } from '@/utils/formater';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { COLOR } from '@/configs/enum';

interface IProps {
  data: {
    count: number;
    rows: Array<IAddress>;
  };
  current: number;
  onPageChange: (page: number) => void;
}

const columns = [
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '累计收款金额（USDT）',
    dataIndex: 'receive_amount',
    key: 'receive_amount',
    render: (val: any) => {
      return formatAmount(val, '');
    },
  },
  {
    title: '最近收款时间',
    dataIndex: 'receive_latest',
    key: 'receive_latest',
  },
  {
    title: '添加时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '是否启用',
    dataIndex: 'enabled',
    key: 'enabled',
    render: (val: any) => {
      if (val === true) {
        return <Badge status="processing" text="启用中" />;
      }
      return <Badge status="error" text="已禁用" />;
    },
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'id',
    render: (val: any, data: any) => {
      const { enabled } = data;
      if (enabled === true) {
        return <a>禁用</a>;
      }

      return <a>启用</a>;
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
