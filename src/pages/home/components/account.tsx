import React from 'react';
import { Card, Avatar } from 'antd';
import { formatAmount } from '@/utils/formater';

interface IProps {
  data: any;
  loading: boolean;
}

const Account: React.FC<IProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Card title="账户" bordered={false} className="tw-mb-3">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-items-center">
            <Avatar size={46} src={`/${data.coin_code.toLowerCase()}.png`} />
            <div className="tw-ml-3">
              <h4 className="tw-mb-0 tw-text-lg">
                {formatAmount(data.coin_amount)}
              </h4>
              <div className="tw-text-gray-500">
                {data.coin_code}（{data.coin_name}）
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default React.memo(Account);
