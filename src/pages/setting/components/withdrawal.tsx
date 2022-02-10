import React from 'react';
import { useModel } from 'umi';
import { Form, Space, InputNumber, Input, Switch, Button, Divider } from 'antd';
import { SETTING_TYPE } from '@/configs/setting';
import { formatAmount } from '@/utils/formater';
import { usePageContext } from '@/hooks/usePageContext';

interface IProps {
  onSubmit: (values: any) => void;
  data: any;
  loading: boolean;
}

const Withdrawal: React.FC<IProps> = (props) => {
  const { data, loading } = props;
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { coinCode } = usePageContext();

  const { settings = {} } = initialState!;
  const { config = {} } = settings as any;

  React.useEffect(() => {
    const {
      withdrawal_auto_enabled,
      withdrawal_auto_address,
      withdrawal_auto_threshold = 100,
    } = data;
    form.setFieldsValue({
      withdrawal_auto_enabled,
      withdrawal_auto_threshold,
      withdrawal_auto_address,
    });
  }, [data]);

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        props.onSubmit({
          ...values,
          type: SETTING_TYPE.WITHDRAWAL,
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
        name="withdrawal"
        layout="vertical"
        initialValues={{
          enable: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="是否开启自动提现"
          name="withdrawal_auto_enabled"
          valuePropName="checked"
        >
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.withdrawal_auto_enabled !==
            currentValues.withdrawal_auto_enabled
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('withdrawal_auto_enabled') === true ? (
              <Form.Item
                name="withdrawal_auto_threshold"
                label="金额阈值"
                rules={[
                  { required: true, message: '金额阈值不能为空' },
                  {
                    pattern: /^(?:0|[1-9]\d{0,8})(?:\.\d{0,1}[1-9])?$/,
                    message: '仅支持金额类型，最多两位小数',
                  },
                  {
                    type: 'number',
                    min: parseFloat(config.user_withdrawal_min_amount),
                    message: `金额阈值不能低于：${formatAmount(
                      config.user_withdrawal_min_amount,
                      coinCode,
                    )}`,
                  },
                ]}
              >
                <InputNumber
                  step={10}
                  placeholder="请输入金额类型，最多两位小数..."
                  style={{ width: '360px' }}
                  addonAfter={coinCode}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.withdrawal_auto_enabled !==
            currentValues.withdrawal_auto_enabled
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('withdrawal_auto_enabled') === true ? (
              <Form.Item
                name="withdrawal_auto_address"
                label="接收地址"
                rules={[
                  { required: true, message: '接收地址不能为空' },
                  {
                    pattern: /^T[0-9a-zA-Z]{33}$/,
                    message: '仅支持波场网络以 T 开头的地址...',
                  },
                ]}
              >
                <Input
                  placeholder="请输入波场网络以 T 开头的地址..."
                  style={{ width: '360px' }}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              loading={loading}
              onClick={onSubmit}
              type="primary"
              htmlType="submit"
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
          <li>
            开启自动提现后，当账户余额达到设置的金额阈值时，系统将会自动向指定的地址进行转账操作。
          </li>
          <li>
            系统最低提现金额：
            {`${formatAmount(config.user_withdrawal_min_amount)} ${coinCode}`}。
          </li>
          <li>开启自动提现后，你将不能进行手动提现操作。</li>
          <li>请确保输入正确的提现接收地址。</li>
        </ol>
      </div>
    </>
  );
};

export default Withdrawal;
