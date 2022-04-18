import React from 'react';
import { Form, Button, Divider, Alert, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'umi';
import ITransaction from '@/types/ITransaction';

interface IProps {
  data: ITransaction;
  onActionDone?: () => void;
}

const HANDLE_TYPE = {
  ADDRESS: 'address',
  HASH: 'hash',
};

const TransactionHandle: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleSearch = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res: any = await dispatch({
          type: 'transaction/search',
          payload: values,
        });

        console.log('res:', res);

        if (res && res.success === true) {
        }
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['transaction/add'],
  );

  return (
    <>
      <Alert
        message="如用户实际支付金额与订单金额不匹配，导致系统无回调通知，可使用该页面功能进行人工处理。"
        type="warning"
        closable
        showIcon
        className="tw-mb-3"
      />

      <Form
        form={form}
        layout="vertical"
        name="transactionHandle"
        initialValues={{ type: HANDLE_TYPE.ADDRESS, address: '', hash: '' }}
        autoComplete="off"
      >
        <Form.Item label="查询类型" name="type">
          <Radio.Group>
            <Radio value={HANDLE_TYPE.ADDRESS}>按发送地址查询</Radio>
            <Radio value={HANDLE_TYPE.HASH}>按交易哈希查询</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('type') === HANDLE_TYPE.ADDRESS ? (
              <Form.Item
                name="address"
                label="发送地址"
                rules={[
                  { required: true, message: '发送地址不能为空' },
                  {
                    pattern: /^T[0-9a-zA-Z]{33}$/i,
                    message: '仅支持波场网络以 T 开头的地址',
                  },
                ]}
              >
                <Input
                  style={{ width: '600px' }}
                  placeholder="请输入交易发送地址..."
                  maxLength={34}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="hash"
                label="交易哈希"
                rules={[
                  { required: true, message: '交易哈希不能为空' },
                  {
                    pattern: /^[0-9a-z]{64}$/i,
                    message: '仅支持交易哈希格式，长度为 64 位',
                  },
                ]}
              >
                <Input
                  style={{ width: '600px' }}
                  placeholder="请输入交易哈希..."
                  maxLength={64}
                />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSearch} type="primary">
            查询
          </Button>
        </Form.Item>
      </Form>

      <Divider dashed />
      <div>
        <h3>说明</h3>
        <ol>
          <li>
            该操作会将订单标注为已支付状态，同时发送系统回调通知，回调金额为订单金额。
          </li>
        </ol>
      </div>
    </>
  );
};

export default React.memo(TransactionHandle);
