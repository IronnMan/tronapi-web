import React from 'react';
import { useModel, useSelector, useDispatch, history } from 'umi';
import { Button, Divider } from 'antd';
import { ProFormText, LoginForm, ProFormSelect } from '@ant-design/pro-form';
import Footer from '@/components/footer';
import { CURRENCY_OPTIONS } from '@/configs/options';
import { ArrowRightOutlined } from '@ant-design/icons';
import { CURRENCY_TYPE } from '@/configs/enum';
import { SystemModelState } from '@/models/system';
import styles from './test.less';

const TestPage: React.FC = () => {
  const dispatch = useDispatch();
  const { initialState } = useModel('@@initialState');

  const { test_transaction: transactionInfo }: SystemModelState = useSelector(
    (state: any) => state.system,
  );
  const { cashier_url } = transactionInfo;
  if (cashier_url) {
    window.location.href = cashier_url;
    return null;
  }

  const onSubmit = (values: any) => {
    dispatch({
      type: 'system/createTestTransaction',
      payload: { ...values },
    });
  };
  const { logo, name }: any = initialState?.settings;
  const loading = useSelector(
    (state: any) => state.loading.effects['system/createTestTransaction'],
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={logo || process.env.APP_LOGO}
          title={name || process.env.APP_NAME}
          subTitle={'订单测试'}
          submitter={false}
          onFinish={async (values) => {
            await onSubmit(values);
          }}
          initialValues={{
            currency: CURRENCY_TYPE.CNY,
            amount: 100,
          }}
        >
          <ProFormSelect
            name="currency"
            fieldProps={{
              size: 'large',
            }}
            options={CURRENCY_OPTIONS}
            placeholder="订单币种"
            label="订单币种"
            allowClear={false}
            rules={[{ required: true, message: '订单币种不能为空' }]}
          />
          <ProFormText
            name="amount"
            fieldProps={{
              size: 'large',
            }}
            label="订单金额"
            placeholder="订单金额"
            rules={[
              { required: true, message: '订单金额不能为空' },
              {
                pattern: /^(?:0|[1-9]\d{0,8})(?:\.\d{0,1}[1-9])?$/,
                message: '仅支持金额类型，最多两位小数',
              },
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
            <a href="#!" onClick={() => history.push('/')}>
              退出 <ArrowRightOutlined />
            </a>
          </div>
          <Divider />
          <div>
            <h3>说明</h3>
            <ol>
              <li>本页面功能演示相关订单接口的创建及支付流程。</li>
              <li>可登录系统免费获取测试币用于测试。</li>
            </ol>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
