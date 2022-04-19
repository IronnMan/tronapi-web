import React from 'react';
import { Form, Space, Popconfirm, Button, Divider, Input, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { SETTING_TYPE } from '@/configs/setting';

interface IProps {
  onSubmit: (values: any) => void;
  data: any;
  loading: boolean;
}

const KeyStone: React.FC<IProps> = (props) => {
  const { data, loading } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onSubmit = () => {
    props.onSubmit({
      type: SETTING_TYPE.KEYSTONE,
    });
  };

  return (
    <>
      <Form
        form={form}
        name="keystone"
        initialValues={data}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item label="public key">
          <Input.Group compact>
            <Form.Item noStyle name="public_key">
              <Input.Password readOnly style={{ width: '360px' }} />
            </Form.Item>
            <CopyToClipboard
              key="parse"
              text={data.public_key}
              onCopy={() => message.success('public key 已复制')}
            >
              <Button icon={<CopyOutlined />}></Button>
            </CopyToClipboard>
          </Input.Group>
        </Form.Item>

        <Form.Item label="private key">
          <Input.Group compact>
            <Form.Item noStyle name="private_key">
              <Input.Password readOnly style={{ width: '360px' }} />
            </Form.Item>
            <CopyToClipboard
              key="parse"
              text={data.private_key}
              onCopy={() => message.success('private key 已复制')}
            >
              <Button icon={<CopyOutlined />}></Button>
            </CopyToClipboard>
          </Input.Group>
        </Form.Item>

        <Form.Item>
          <Space>
            <Popconfirm
              title={
                <div>
                  <h4>确认重新生成接口密钥吗？</h4>
                  <span>生成新的接口密钥，将会自动禁用旧的接口密钥。</span>
                </div>
              }
              okText="确认"
              cancelText="取消"
              onConfirm={onSubmit}
            >
              <Button type="primary" htmlType="submit" loading={loading}>
                重新生成
              </Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
      <Divider dashed />
      <div>
        <h3>说明</h3>
        <ol>
          <li>生成新的接口密钥，将会自动禁用旧的接口密钥。</li>
          <li>
            请务必妥善保管你的接口密钥。由密钥泄漏导致的资产受损平台概不负责。
          </li>
        </ol>
      </div>
    </>
  );
};

export default React.memo(KeyStone);
