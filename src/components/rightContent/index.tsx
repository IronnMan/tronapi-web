import { Space, Tooltip, Dropdown, Card, ConfigProvider } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import { CirclePicker } from 'react-color';
import Storage from '@/utils/storage';
import { STORAGE_KEY, THEME_COLORS } from '@/configs';
import Avatar from './avatarDropdown';
import { LINK } from '@/configs/links';
import {
  QuestionCircleOutlined,
  FileOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const ThemeColorPicker = (props: any) => {
  const { onChange } = props;
  return (
    <div className="tw-p-4 tw-shadow-lg tw-bg-white tw-rounded-sm">
      <CirclePicker
        triangle="hide"
        onChange={onChange}
        circleSize={20}
        circleSpacing={10}
        width={180}
        colors={THEME_COLORS}
      />
    </div>
  );
};

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const onThemeChange = ({ hex }: any) => {
    ConfigProvider.config({
      theme: {
        primaryColor: hex,
      },
    });

    Storage.setItem(STORAGE_KEY.THEME_COLOR, hex);
  };

  return (
    <Space className={className}>
      <Tooltip title="接入文档" placement="bottom">
        <span
          className={styles.action}
          onClick={() => {
            window.open(LINK.API);
          }}
        >
          <FileOutlined />
        </span>
      </Tooltip>
      <Tooltip title="常见问题" placement="bottom">
        <span
          className={styles.action}
          onClick={() => {
            window.open(LINK.FAQ);
          }}
        >
          <QuestionCircleOutlined />
        </span>
      </Tooltip>
      <Dropdown
        overlay={<ThemeColorPicker onChange={onThemeChange} />}
        trigger={['click']}
        placement="bottomLeft"
      >
        <span className={styles.action}>
          <SkinOutlined />
        </span>
      </Dropdown>
      <Avatar menu />
    </Space>
  );
};
export default GlobalHeaderRight;
