import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Space, Input, Button, Divider, message } from 'antd';
import { SETTING_TYPE } from '@/configs/setting';
import Validator from '@/utils/validator';

interface IProps {
  onSubmit: (values: any) => void;
  data: any;
  loading: boolean;
}

const WebHook: React.FC<IProps> = (props) => {
  const { data, loading } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [testField, setTestField] = React.useState('');
  React.useEffect(() => {
    const { transaction_webhook_url, withdrawal_webhook_url } = data;
    form.setFieldsValue({
      transaction_webhook_url,
      withdrawal_webhook_url,
    });
  }, [data]);

  const onTest = async (field: string) => {
    const fieldVal = form.getFieldValue(field);

    if (!fieldVal) {
      message.warning('回调通知地址不能为空');
      return;
    }

    if (!Validator.urlValidator(fieldVal)) {
      message.warning('回调通知地址格式不正确');
      return;
    }

    setTestField(field);

    const res: any = await dispatch({
      type: 'system/testWebhookUrl',
      payload: {
        url: fieldVal,
      },
    });

    if (res && res.success === true) {
      message.success(res.data);
    }
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        props.onSubmit({
          ...values,
          type: SETTING_TYPE.WEBHOOK,
        });
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  const loadingTest = useSelector(
    (state: any) => state.loading.effects['system/testWebhookUrl'],
  );

  const initialState = React.useMemo(() => {
    const { transaction_webhook_url, withdrawal_webhook_url } = data;
    return {
      transaction_webhook_url,
      withdrawal_webhook_url,
    };
  }, [data]);

  return (
    <>
      <Form
        form={form}
        name="webhook"
        layout="vertical"
        initialValues={initialState}
        autoComplete="off"
      >
        <Form.Item label="订单回调地址">
          <Input.Group compact>
            <Form.Item
              name="transaction_webhook_url"
              noStyle
              rules={[
                {
                  pattern:
                    /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i,
                  message: '仅支持以 http 或 https 开头的链接类型',
                },
              ]}
            >
              <Input
                placeholder="请输入以 http 或 https 开头的链接类型..."
                style={{ width: '360px' }}
              />
            </Form.Item>
            <Button
              type="default"
              loading={testField === 'transaction_webhook_url' && loadingTest}
              onClick={() => onTest('transaction_webhook_url')}
            >
              测试
            </Button>
          </Input.Group>
        </Form.Item>

        <Form.Item label="提现回调地址">
          <Input.Group compact>
            <Form.Item
              noStyle
              name="withdrawal_webhook_url"
              rules={[
                {
                  pattern:
                    /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i,
                  message: '仅支持以 http 或 https 开头的链接类型',
                },
              ]}
            >
              <Input
                placeholder="请输入以 http 或 https 开头的链接类型..."
                style={{ width: '360px' }}
              />
            </Form.Item>
            <Button
              type="default"
              loading={testField === 'withdrawal_webhook_url' && loadingTest}
              onClick={() => onTest('withdrawal_webhook_url')}
            >
              测试
            </Button>
          </Input.Group>
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
          <li>
            订单回调地址将用于成功后的回调通知。如创建订单接口未指定 notify_url
            参数，则会使用此处配置的地址。
          </li>
          <li>
            提现回调地址将用于提现成功后的回调通知。如创建提现接口未指定
            notify_url 参数，则会使用此处配置的地址。
          </li>
          <li>回调地址仅支持以 http 或 https 开头的链接类型。</li>
          <li>
            测试操作将会发送一个 POST
            消息到相关的回调地址，探测其是否可连通访问。
          </li>
          <li>请确保输入的回调地址可公网访问。</li>
        </ol>
      </div>
    </>
  );
};

export default WebHook;
