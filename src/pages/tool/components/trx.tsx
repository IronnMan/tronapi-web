import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Input, Divider, Space, Button, message } from 'antd';
import { LINKS } from '@/configs/links';

const Trx: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector(
    (state: any) => state.loading.effects['system/sendTrx'],
  );

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res: any = await dispatch({
          type: 'system/sendTrx',
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

  return (
    <>
      <Form
        form={form}
        name="trx"
        layout="vertical"
        initialValues={{
          address: '',
        }}
        autoComplete="off"
      >
        <Form.Item
          name="address"
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
      <Divider />
      <h3>说明</h3>
      <ul className="tw-px-5">
        <li>
          目前系统使用的测试网络为 shasta，相关区块链浏览器地址：
          <a href={LINKS.SHASTA_BROWSER} target="_blank">
            {LINKS.SHASTA_BROWSER}
          </a>
        </li>
        <li>申请后系统会自动发送 1000 TRX 至你提交的地址。</li>
        <li>
          申请成功后，访问如下地址可查询账户信息及测试币余额：
          https://shasta.tronscan.org/#/address/这里补充提交的地址
        </li>
        <li>
          更多关于测试 TRX 的信息，可访问官方说明文档：
          <a href={LINKS.FAU_DOC} target="_blank">
            {LINKS.FAU_DOC}
          </a>
        </li>
      </ul>
    </>
  );
};

export default Trx;
