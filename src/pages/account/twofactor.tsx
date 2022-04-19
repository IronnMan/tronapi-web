import React from 'react';
import { useModel, history, useSelector, useDispatch } from 'umi';
import { Button, Divider, message } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import Footer from '@/components/footer';
import Storage from '@/utils/storage';
import { aes_encrypt } from '@/utils/crypto';
import { STORAGE_KEY } from '@/configs/index';
import styles from './style.less';

const TwoFactorPage: React.FC = () => {
  const userId = Storage.getItem(STORAGE_KEY.USERID);

  if (!userId) {
    history.push('/account/signin');
    return null;
  }

  const dispatch = useDispatch();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    return () => {
      Storage.removeItem(STORAGE_KEY.USERID);
    };
  }, []);

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
      type: 'account/twofactor',
      payload: {
        ...values,
        id: userId,
      },
    });
    if (res && res.success === true) {
      setDisabled(true);
      await setUserAuthorization(res.data.token);
      await setUserStorage({ ...values });
      await fetchUserInfo();
      message.loading('登录成功，正在前往系统...', 1.5, () => {
        history.replace('/');
      });
    }
  };

  const { logo, name, slogan }: any = initialState?.settings;

  const loading = useSelector(
    (state: any) => state.loading.effects['account/twofactor'],
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
            name="token"
            fieldProps={{
              size: 'large',
              prefix: <SafetyOutlined />,
            }}
            label="两步安全验证"
            placeholder="安全码"
            rules={[
              {
                required: true,
                message: '安全码不能为空',
              },
              {
                pattern: /^[0-9]{6}$/,
                message: '仅支持输入6位数字安全码',
              },
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
              提交
            </Button>
          </div>
          <Divider dashed />
          <div>
            <h3>说明</h3>
            <ol>
              <li>请输入 Google Authenticator 上显示的 6 位数字安全码。</li>
            </ol>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default TwoFactorPage;
