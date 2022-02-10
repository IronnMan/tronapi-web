import React, { useCallback } from 'react';
import { LogoutOutlined, FormOutlined } from '@ant-design/icons';
import { Menu, Spin, Avatar } from 'antd';
import { history, useModel } from 'umi';
import Storage from '@/utils/storage';
import { STORAGE_KEY } from '@/configs/index';
import HeaderDropdown from '../headerDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        Storage.removeItem(STORAGE_KEY.AUTHORIZATION);
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        window.location.href = '/account/signin';
        return;
      }
      if (key === 'updatepwd') {
        history.push('/account/updatepwd');
        return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.username) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="updatepwd">
          <FormOutlined />
          修改密码
        </Menu.Item>
      )}
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size={18} src={currentUser.user_config.avatar}></Avatar>
        <span className={`${styles.name} anticon tw-ml-2`}>
          {currentUser.user_config.realname || currentUser.username}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
