import React from 'react';
import { Table, Divider, Popconfirm, Pagination, Badge, message } from 'antd';
import { useDispatch, useSelector } from 'umi';
import IAddress from '@/types/IAddress';
import { formatDateTime, formatAmount } from '@/utils/formater';
import { LINK } from '@/configs/links';

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

  const onAddressUpdate = async (id: string, enabled: boolean) => {
    const res: any = await dispatch({
      type: 'address/update',
      payload: {
        id,
        enabled,
      },
    });

    if (res && res.success === true) {
      message.success('地址信息更新成功');
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
      render: (val: string) => {
        return (
          <a target="_blank" href={`${LINK.BROWSER}/#/address/${val}`}>
            {val}
          </a>
        );
      },
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
      render: (val: string) => {
        return formatDateTime(val);
      },
    },
    {
      title: '添加时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (val: string) => {
        return formatDateTime(val);
      },
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
        const { id, enabled } = data;
        if (enabled === true) {
          return (
            <Popconfirm
              title="确认禁用该收款地址？"
              onConfirm={() => onAddressUpdate(id, false)}
              onCancel={() => null}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">禁用</a>
            </Popconfirm>
          );
        }

        return (
          <Popconfirm
            title="确认启用该收款地址？"
            onConfirm={() => onAddressUpdate(id, true)}
            onCancel={() => null}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">启用</a>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        dataSource={data.rows}
        columns={columns}
        rowKey={'id'}
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

      <Divider dashed />
      <div>
        <h3>说明</h3>
        <ol>
          <li>请确保至少一条地址信息处于启用状态，否则无法发起订单收款。</li>
          <li>当前账户最多支持1条地址信息处于启用状态。</li>
          <li>商户可前往工具菜单，在线生成可用于收款的全新地址。</li>
        </ol>
      </div>
    </>
  );
};

export default React.memo(ListData);
