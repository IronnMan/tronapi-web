import React from 'react';
import { PageHeader, Space, Avatar } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';

const getCurrentDateTime = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

const Header: React.FC = () => {
  const [datetime, setDatetime] = React.useState(getCurrentDateTime());
  const { initialState } = useModel('@@initialState');
  const { username, user_config = {} } = initialState?.currentUser || {};
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setDatetime(getCurrentDateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageHeader ghost={false} title="首页">
      <Space size="middle">
        <Avatar size={46} src={user_config.avatar} />
        <div>
          <div className="tw-mb-1 tw-text-lg tw-font-bold">
            欢迎，{username}
          </div>
          <span className="tw-text-gray-600">
            <CalendarOutlined className="tw-mr-1" /> {datetime}
          </span>
        </div>
      </Space>
    </PageHeader>
  );
};

export default React.memo(Header);
