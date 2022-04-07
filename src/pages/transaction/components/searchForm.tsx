import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Button, Space, message } from 'antd';

interface IProps {
  onNext: () => boolean;
  onPrev: () => void;
}
const SearchForm: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res: any = await dispatch({
          type: 'system/sendFau',
          payload: values,
        });
        if (res && res.success === true) {
          message.success(res.data);
        }
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['system/sendFau'],
  );

  return (
    <Form
      form={form}
      name="fau"
      layout="vertical"
      initialValues={{
        address: '',
      }}
      autoComplete="off"
    >
      <Form.Item
        name="address"
        label=""
        rules={[
          { required: true, message: '接收地址不能为空' },
          {
            pattern: /^T[0-9a-zA-Z]{33}$/,
            message: '仅支持波场网络以 T 开头的地址...',
          },
        ]}
      >
        <Input
          placeholder="请输入交易..."
          style={{
            width: '360px',
          }}
        />
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
  );
};

export default React.memo(SearchForm);
