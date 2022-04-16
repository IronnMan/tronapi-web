import React from 'react';
import { history, Link, useModel, useSelector, useDispatch } from 'umi';
import { Button, Divider, message } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import Footer from '@/components/footer';
import styles from './style.less';

const SignupPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [disabled, setDisabled] = React.useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (values: any) => {
    const res: any = await dispatch({
      type: 'account/signup',
      payload: { ...values },
    });
    if (res && res.success === true) {
      setDisabled(true);

      message.success(res.data, 1.5, () => {
        history.push('/account/signin');
      });
    }
  };

  const { logo, name, slogan }: any = initialState?.settings;

  const loading = useSelector(
    (state: any) => state.loading.effects['account/signup'],
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
          <ProFormText
            name="name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="商户名"
            rules={[
              {
                required: true,
                message: '商户名不能为空',
              },
              {
                pattern: /^[a-zA-Z0-9_]{6,32}$/,
                message: '长度6到32位，仅支持英文、数字、下线线组合',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="登录密码"
            rules={[
              { required: true, message: '登录密码不能为空' },
              {
                pattern: /^[a-zA-Z0-9_]{6,32}$/,
                message: '长度6到32位，仅支持英文、数字、下线线组合',
              },
            ]}
          />
          <ProFormText.Password
            name="repassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="确认登录密码"
            rules={[
              { required: true, message: '确认登录密码不能为空' },
              {
                pattern: /^[a-zA-Z0-9_]{6,32}$/,
                message: '长度6到32位，仅支持英文、数字、下线线组合',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
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
              disabled={disabled}
              htmlType="submit"
              block
              size="large"
            >
              注册
            </Button>
          </div>
          <Link to="/account/signin">
            <div className="tw-text-center">
              已有账号？立即登录 <ArrowRightOutlined />
            </div>
          </Link>
          <Divider />
          <div>
            <h3>说明</h3>
            <ol>
              <li>请牢记你的商户名和登录密码，系统暂不提供找回密码功能。</li>
              <li>建议登录系统后配置账户两步安全验证。</li>
              <li>请定期更新你的登录密码，防止意外的安全风险。</li>
            </ol>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
