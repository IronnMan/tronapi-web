import React from 'react';
import { Link, useModel, useSelector, useDispatch } from 'umi';
import { message, Button, Divider } from 'antd';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Footer from '@/components/footer';
import Storage from '@/utils/storage';
import { STORAGE_KEY } from '@/configs';
import styles from './style.less';

const UpdatePwdPage: React.FC = () => {
  const dispatch = useDispatch();
  const { initialState, setInitialState } = useModel('@@initialState');

  const { logo, name, slogan }: any = initialState?.settings;

  const onSubmit = async (values: any) => {
    const res: any = await dispatch({
      type: 'user/updatePassword',
      payload: { ...values },
    });
    if (res && res.success === true) {
      message.success(res.data, 2, () => {
        Storage.removeItem(STORAGE_KEY.AUTHORIZATION);
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        window.location.href = '';
      });
    }
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['user/updatePassword'],
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={logo || process.env.APP_LOGO}
          title={name || process.env.APP_NAME}
          subTitle={slogan || process.env.APP_SLOGAN}
          submitter={false}
          onFinish={async (values) => {
            await onSubmit(values);
          }}
        >
          <ProFormText.Password
            name="password_old"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="原密码"
            rules={[
              {
                required: true,
                message: '请输入原密码',
              },
              {
                pattern: /^[a-zA-Z0-9_]{6,32}$/,
                message: '长度6到32位，仅支持英文、数字、下线线组合',
              },
            ]}
          />
          <ProFormText.Password
            name="password_new"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
              {
                pattern: /^[a-zA-Z0-9_]{6,32}$/,
                message: '长度6到32位，仅支持英文、数字、下线线组合',
              },
            ]}
          />
          <ProFormText.Password
            name="password_new_re"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="确认新密码"
            rules={[
              {
                required: true,
                message: '请再次输入新密码',
              },
              {
                pattern: /^[a-zA-Z0-9_]{6,32}$/,
                message: '长度6到32位，仅支持英文、数字、下线线组合',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password_new') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入密码不一致'));
                },
              }),
            ]}
          />
          <div className="tw-mb-6">
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              block
              size="large"
            >
              提交
            </Button>
          </div>
          <div className="tw-text-center">
            <Link to="/" className="tw-text-gray-600">
              <ArrowLeftOutlined /> 返回
            </Link>
          </div>
          <Divider />
          <div>
            <h3>说明</h3>
            <ol>
              <li>修改密码后需要重新登录系统。</li>
            </ol>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePwdPage;
