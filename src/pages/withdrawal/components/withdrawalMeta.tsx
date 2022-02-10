import React from 'react';
import { Descriptions, Tag, Divider, Space } from 'antd';
import IWithdrawal from '@/types/IWithdrawal';
import { formatAmount, formatDateTime } from '@/utils/formater';
import {
  CheckCircleOutlined,
  WarningOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { COLOR } from '@/configs/enum';
import { TRON_BROWSER } from '@/configs/tron';
import {
  WITHDRAWAL_TYPE_TEXT,
  WITHDRAWAL_STATUS,
  WITHDRAWAL_STATUS_TEXT,
} from '@/configs/withdrawal';

interface IProps {
  data: IWithdrawal;
}

const WithdrawalStatus = (props: { data: IWithdrawal }) => {
  const { data } = props;
  if (data.status === WITHDRAWAL_STATUS.DONE) {
    return (
      <Space>
        <Tag icon={<CheckCircleOutlined />} color={COLOR.GREEN}>
          {WITHDRAWAL_STATUS_TEXT[data.status]}
        </Tag>
        <Tag color={COLOR.YELLOW}>
          处理时间：{formatDateTime(data.status_time)}
        </Tag>
        <a
          href={`${TRON_BROWSER[data.coin_code]}/transaction/${data.hash}`}
          target="_blank"
        >
          查看交易详情 <ArrowRightOutlined />
        </a>
      </Space>
    );
  }

  if (data.status === WITHDRAWAL_STATUS.REJECTED) {
    return (
      <Tag icon={<WarningOutlined />} color={COLOR.RED}>
        {WITHDRAWAL_STATUS_TEXT[data.status]}
      </Tag>
    );
  }

  if (data.status === WITHDRAWAL_STATUS.NEW) {
    return (
      <Tag icon={<WarningOutlined />} color={COLOR.ORANGE}>
        {WITHDRAWAL_STATUS_TEXT[data.status]}
      </Tag>
    );
  }

  return <span>-</span>;
};

const WithdrawalMeta: React.FC<IProps> = (props) => {
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
        <Descriptions.Item label="申请金额">
          {data.amount_submit
            ? formatAmount(data.amount_submit, data.coin_code)
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="提现费率">
          {data.amount_fee
            ? `${formatAmount(data.amount_fee, data.coin_code)}（${
                data.rate * 100
              }%）`
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="接收金额">
          {data.amount_send
            ? formatAmount(data.amount_send, data.coin_code)
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="接收地址">
          {data.address ? (
            <a
              href={`${TRON_BROWSER[data.coin_code]}/address/${data.address}`}
              target="_blank"
            >
              {data.address}
            </a>
          ) : (
            '-'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="操作类型">
          {data.type ? WITHDRAWAL_TYPE_TEXT[data.type] : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {data.create_time ? formatDateTime(data.create_time) : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="提现状态">
          <WithdrawalStatus data={data} />
        </Descriptions.Item>
      </Descriptions>
      <Divider dashed />
      <div>
        <h3>说明</h3>
        <ol>
          <li>提现到账金额 = 提现申请金额 - 提现申请金额 * 账户费率。</li>
          <li>提现申请提交后，一般10分钟左右到账。</li>
        </ol>
      </div>
    </>
  );
};

export default React.memo(WithdrawalMeta);
