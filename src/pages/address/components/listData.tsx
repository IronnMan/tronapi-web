import React from 'react';
import { Table, Pagination, Badge, message } from 'antd';
import { useDispatch, useSelector } from 'umi';
import IAddress from '@/types/IAddress';
import { formatAmount } from '@/utils/formater';
interface IProps {
  data: {
    count: number;
    rows: Array<IAddress>;
  };
  current: number;
  onRowUpdate: () => void;
  onPageChange: (page: number) => void;
}

const ListData: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const { data, current, onPageChange } = props;
  const { rows, count } = data;

  const onAddressUpdate = async (address: string, enabled: boolean) => {
    const res: any = await dispatch({
      type: 'address/update',
      payload: {
        address,
        enabled,
      },
    });

    if (res && res.success === true) {
      message.success('新增添加成功');
      props.onRowUpdate();
    }
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['address/update'],
  );

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
        const { address, enabled } = data;
        if (enabled === true) {
          return <a onClick={() => onAddressUpdate(address, false)}>禁用</a>;
        }
        return <a onClick={() => onAddressUpdate(address, true)}>启用</a>;
      },
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        dataSource={data.rows}
        columns={columns}
        pagination={false}
      />
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
