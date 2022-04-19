import React from 'react';
import { useModel, history, Link, useSelector, useDispatch } from 'umi';
import { Button, Divider, message } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import Footer from '@/components/footer';
import Storage from '@/utils/storage';
import { aes_decrypt, aes_encrypt } from '@/utils/crypto';
import { STORAGE_KEY } from '@/configs/index';
import styles from './style.less';

const SigninPage: React.FC = () => {
  const dispatch = useDispatch();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [disabled, setDisabled] = React.useState(false);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const setUserAuthorization = async (authorization: string) => {
    Storage.setItem(STORAGE_KEY.AUTHORIZATION, authorization);
  };

  const setUserStorage = (values: any) => {
    const { rememberme } = values;
    if (rememberme === true) {
      const userInfo = aes_encrypt(
        JSON.stringify(values),
        process.env.AES_KEY!,
      );
      Storage.setItem(STORAGE_KEY.USERLOGININFO, userInfo);
    } else {
      Storage.removeItem(STORAGE_KEY.USERLOGININFO);
    }
  };

  const onSubmit = async (values: any) => {
    const res: any = await dispatch({
      type: 'account/signin',
      payload: { ...values },
    });

    if (res && res.success === true) {
      const { twofactor, token } = res.data;
      if (twofactor === false) {
        await setUserAuthorization(token);
        await setUserStorage({ ...values });
        await fetchUserInfo();
        setDisabled(true);
        message.loading('登录成功，正在前往系统...', 1.5, () => {
          history.replace('/');
        });
      } else {
        Storage.setItem(STORAGE_KEY.USERID, token);
        history.push('/account/twofactor');
      }
    }
  };

  const { logo, name, slogan }: any = initialState?.settings;

  const loading = useSelector(
    (state: any) => state.loading.effects['account/signin'],
  );

  const onFormRequest = React.useCallback(() => {
    try {
      const rememberUserInfo = Storage.getItem(STORAGE_KEY.USERLOGININFO);
      if (rememberUserInfo) {
        const data = JSON.parse(
          aes_decrypt(rememberUserInfo, process.env.AES_KEY!),
        );
        return data;
      }
    } catch (err) {
      console.info(err);
    }
    return {
      rememberme: true,
    };
  }, []);

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
          request={onFormRequest}
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
          <div className="tw-mb-6">
            <ProFormCheckbox noStyle name="rememberme">
              记住密码
            </ProFormCheckbox>
          </div>
          <div className="tw-mb-6">
            <Button
              type="primary"
              loading={loading}
              disabled={disabled}
              htmlType="submit"
              block
              size="large"
            >
              登录
            </Button>
          </div>
          <Link to="/account/signup">
            <div className="tw-text-center">
              没有账号？免费注册 <ArrowRightOutlined />
            </div>
          </Link>
          <Divider dashed />
          <div>
            <h3>说明</h3>
            <ol>
              <li>连续多次输入错误密码登录将会导致账号被锁定。</li>
              <li>建议登录系统后配置账户两步安全验证。</li>
              <li>
                系统暂不提供找回密码功能，如忘记商户名或登录密码，请联系系统管理员。
              </li>
            </ol>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default SigninPage;
