import React from 'react';
import { Alert } from 'antd';

interface IProps {
  data: any;
  loading: boolean;
}

const Notice: React.FC<IProps> = (props) => {
  const { data } = props;
  if (!data || !data.title) return null;
  return (
    <div className="tw-mb-3">
      <Alert type="warning" message={data.title} description={data.content} />
    </div>
  );
};

export default React.memo(Notice);
