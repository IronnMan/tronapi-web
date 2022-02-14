import React from 'react';
import {
  Form,
  Space,
  Input,
  Checkbox,
  Button,
  Divider,
  Row,
  Col,
  message,
} from 'antd';
import { SETTING_TYPE } from '@/configs/setting';

interface IProps {
  onSubmit: (values: any) => void;
  data: any;
  loading: boolean;
}

const NOTIFICATION_TYPE = [
  'notify_signin_enabled',
  'notify_transaction_enabled',
  'notify_refund_enabled',
  'notify_partial_enabled',
  'notify_withdrawal_enabled',
];

const Notification: React.FC<IProps> = (props) => {
  const { data, loading } = props;

  const [form] = Form.useForm();

  React.useEffect(() => {
    const {
      email,
      notify_signin_enabled,
      notify_transaction_enabled,
      notify_withdrawal_enabled,
      notify_refund_enabled,
      notify_partial_enabled,
    } = data;

    const types = [];

    notify_signin_enabled && types.push('notify_signin_enabled');
    notify_transaction_enabled && types.push('notify_transaction_enabled');
    notify_withdrawal_enabled && types.push('notify_withdrawal_enabled');
    notify_refund_enabled && types.push('notify_refund_enabled');
    notify_partial_enabled && types.push('notify_partial_enabled');

    form.setFieldsValue({
      email,
      types,
    });
  }, [data]);

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { email, types } = values;

        if (types.length && !email) {
          message.warning('通知接收邮箱不能为空');
          return;
        }

        const submitData: any = {
          email,
        };

        NOTIFICATION_TYPE.forEach((type) => {
          submitData[type] = types.includes(type);
        });

        props.onSubmit({
          ...submitData,
          type: SETTING_TYPE.NOTIFICATION,
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
        name="notification"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="接收邮箱"
          name="email"
          rules={[
            {
              pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i,
              message: '邮箱地址格式错误',
            },
          ]}
        >
          <Input placeholder="请输入接收邮箱..." style={{ width: '360px' }} />
        </Form.Item>

        <Form.Item label="接收类型" name="types">
          <Checkbox.Group>
            <Row>
              <Col span={24}>
                <Checkbox value="notify_signin_enabled" className="tw-mb-2">
                  系统登录成功
                </Checkbox>
                <p className="tw-text-gray-500">成功登录系统时发送通知</p>
              </Col>
              <Col span={24}>
                <Checkbox
                  value="notify_transaction_enabled"
                  className="tw-mb-2"
                >
                  订单处理完成
                </Checkbox>
                <p className="tw-text-gray-500">订单处理完成时发送通知</p>
              </Col>
              <Col span={24}>
                <Checkbox value="notify_partial_enabled" className="tw-mb-2">
                  订单部分付款
                </Checkbox>
                <p className="tw-text-gray-500">
                  订单部分付款时发送通知，如已配置自动完成或自动退款，则不会发送通知。
                </p>
              </Col>
              <Col span={24}>
                <Checkbox value="notify_refund_enabled" className="tw-mb-2">
                  订单退款完成
                </Checkbox>
                <p className="tw-text-gray-500">
                  订单退款完成时发送通知，包括自动退款和手动退款
                </p>
              </Col>
              <Col span={24}>
                <Checkbox value="notify_withdrawal_enabled" className="tw-mb-2">
                  提现处理完成
                </Checkbox>
                <p className="tw-text-gray-500">提现处理完成时发送通知。</p>
              </Col>
            </Row>
          </Checkbox.Group>
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
            若邮箱无法接收通知信息，请检查邮箱客户端是否将来自 gmail
            的邮件归入垃圾箱。
          </li>
        </ol>
      </div>
    </>
  );
};

export default Notification;
