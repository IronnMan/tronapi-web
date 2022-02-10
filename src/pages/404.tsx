import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

const NotFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="没有找到你要访问的页面"
      extra={
        <Link to="/">
          <Button type="primary">回到首页</Button>
        </Link>
      }
    />
  );
};

export default React.memo(NotFoundPage);
