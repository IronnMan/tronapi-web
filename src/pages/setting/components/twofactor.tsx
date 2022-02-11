import React from 'react';
import { useDispatch, useSelector } from 'umi';
import {
  Divider,
  Form,
  Space,
  Badge,
  Popconfirm,
  Spin,
  Input,
  Button,
} from 'antd';
import { UserModelState } from '@/models/user';
import { SETTING_TYPE } from '@/configs/setting';
import { TWOFACTOR_TAG } from '@/configs/index';

interface IProps {
  onSubmit: (values: any) => void;
  data: any;
  loading: boolean;
}

const AuthenticatorLinks = [
  {
    name: '安卓（Android）',
    link: '/authenticator-android.png',
  },
  {
    name: '苹果（IOS）',
    link: '/authenticator-ios.png',
  },
];

const TwoFactorCancel: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();

  const { loading } = props;

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.onSubmit({
          ...values,
          tag: TWOFACTOR_TAG.UNBIND,
          type: SETTING_TYPE.TWOFACTOR,
        });
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  return (
    <>
      <Form
        form={form}
        name="twofactor"
        layout="vertical"
        initialValues={{
          token: '',
        }}
        autoComplete="off"
      >
        <Form.Item name="token" label="两步安全验证">
          <Badge status="success" text="已开启" />
        </Form.Item>

        <Form.Item
          name="token"
          label="安全码"
          rules={[
            {
              required: true,
              message: '请输入安全码',
            },
            {
              pattern: /^[0-9]{6}$/,
              message: '仅支持输入6位数字安全码',
            },
          ]}
        >
          <Input placeholder="请输入安全码..." style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Popconfirm
              title={
                <div>
                  <h4>确认取消两步安全验证吗？</h4>
                  <span>取消两步安全验证，将极大的增加账号安全风险。</span>
                </div>
              }
              okText="确认"
              onConfirm={onSubmit}
              cancelText="取消"
              placement="right"
            >
              <Button loading={loading} type="primary" htmlType="submit">
                解除
              </Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
      <Divider />
      <div>
        <h3>说明</h3>
        <ol>
          <li>解除两步安全验证，将极大的增加账号安全风险。</li>
        </ol>
      </div>
    </>
  );
};

const TwoFactor: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data, loading } = props;

  const { two_factor_enabled } = data;

  React.useEffect(() => {
    if (two_factor_enabled === false) {
      dispatch({
        type: 'user/getAuthenticator',
      });
    }
  }, [two_factor_enabled]);

  const { authenticator }: UserModelState = useSelector(
    (state: any) => state.user,
  );

  const loadingAuthenticator = useSelector(
    (state: any) => state.loading.effects['user/getAuthenticator'],
  );

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        props.onSubmit({
          ...values,
          tag: TWOFACTOR_TAG.BIND,
          type: SETTING_TYPE.TWOFACTOR,
        });
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  if (two_factor_enabled === true) {
    return <TwoFactorCancel {...props} />;
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          token: '',
        }}
        autoComplete="off"
      >
        <Form.Item label="请使用 Google Authenticator 扫描以下二维码">
          <Spin spinning={loadingAuthenticator}>
            <div className="tw-inline-block tw-border tw-border-solid tw-border-gray-100 tw-p-2">
              <img
                src={authenticator}
                alt="qrcode"
                className="tw-w-40 tw-h-30"
              />
            </div>
          </Spin>
        </Form.Item>

        <Form.Item
          name="token"
          label="安全码"
          rules={[
            {
              required: true,
              message: '请输入安全码',
            },
            {
              pattern: /^[0-9]{6}$/,
              message: '仅支持输入6位数字安全码',
            },
          ]}
        >
          <Input placeholder="请输入安全码..." style={{ width: '176px' }} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              onClick={onSubmit}
            >
              提交
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Divider />
      <div>
        <h3>说明</h3>
        <ol>
          <li>开启两步安全验证，将极大的保障你的账户安全。</li>
        </ol>
        <h4>软件下载</h4>
        <ol>
          <li>请使用手机扫码下载</li>
        </ol>
        <div className="tw-flex tw-items-center">
          {AuthenticatorLinks.map((item, index) => {
            return (
              <div
                key={index}
                className="tw-inline-block tw-border tw-border-gray-100 tw-border-solid tw-p-2 tw-mr-3"
              >
                <img src={item.link} alt="qrcode" className="tw-w-40 tw-h-40" />
                <div className="tw-mt-2 tw-text-center tw-text-gray-500">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TwoFactor;
