import React from 'react';
import { Descriptions, Divider, Space, Tag } from 'antd';
import ITransaction from '@/types/ITransaction';
import { formatAmount, formatDateTime } from '@/utils/formater';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { COLOR } from '@/configs/enum';
import { TRON_BROWSER } from '@/configs/tron';
import { TRANSACTION_STATUS_TEXT } from '@/configs/transaction';

interface IProps {
  data: ITransaction;
}

const TransactionRefund: React.FC<IProps> = (props) => {
  const { data } = props;

  const { user_transaction_refund, coin_code, status } = data;

  return (
    <>
      <Descriptions
        layout="horizontal"
        column={1}
        bordered
        size="middle"
        labelStyle={{ width: '150px' }}
      >
        <Descriptions.Item label="退款金额">
          {formatAmount(user_transaction_refund.value, coin_code)}
        </Descriptions.Item>
        <Descriptions.Item label="退款地址">
          {user_transaction_refund.to}
        </Descriptions.Item>
        <Descriptions.Item label="提交时间">
          {formatDateTime(user_transaction_refund.create_time)}
        </Descriptions.Item>
        <Descriptions.Item label="退款状态">
          <Space>
            {user_transaction_refund.status === true ? (
              <>
                <Tag icon={<CheckCircleOutlined />} color={COLOR.CYAN}>
                  {TRANSACTION_STATUS_TEXT[status]}
                </Tag>
                <a
                  href={`${TRON_BROWSER[coin_code]}/#/transaction/${user_transaction_refund.hash}`}
                  target="_blank"
                >
                  查看交易详情 <ArrowRightOutlined />
                </a>
              </>
            ) : (
              <Tag icon={<WarningOutlined />} color={COLOR.PINK}>
                {TRANSACTION_STATUS_TEXT[status]}
              </Tag>
            )}
          </Space>
        </Descriptions.Item>
        {user_transaction_refund.status === true && (
          <Descriptions.Item label="完成时间">
            {formatDateTime(user_transaction_refund.status_time)}
          </Descriptions.Item>
        )}
      </Descriptions>
      <Divider dashed />
      <div>
        <h3>说明</h3>
        <ol>
          <li>退款操作仅针对用户支付金额小于订单支付金额的情况。</li>
          <li>退款操作会将用户实际支付金额，原路返回关联交易的发送地址。</li>
          <li>退款操作一般10分钟左右到账。</li>
          <li>
            可前往设置页面，针对用户支付金额小于订单支付金额的情况，开启自动退款的配置。
          </li>
        </ol>
      </div>
    </>
  );
};

export default React.memo(TransactionRefund);
