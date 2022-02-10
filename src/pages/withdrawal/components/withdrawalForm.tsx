import React from 'react';
import { useDispatch, useSelector, Link, useModel } from 'umi';
import {
  Modal,
  Form,
  Input,
  Space,
  Statistic,
  Divider,
  Button,
  message,
} from 'antd';
import { ArrowRightOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { usePageContext } from '@/hooks/usePageContext';
import { UserModelState } from '@/models/user';
import { formatAmount } from '@/utils/formater';

interface IProps {
  visible: boolean;
  onCancel: () => void;
}

const WithdrawalForm: React.FC<IProps> = (props) => {
  const { visible } = props;
  const { coinCode } = usePageContext();

  const { initialState = {} } = useModel('@@initialState');
  const { currentUser = {} } = initialState!;
  const { user_config = {} } = currentUser;

  const { wallet }: UserModelState = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res: any = await dispatch({
          type: 'withdrawal/create',
          payload: {
            ...values,
            coin_code: coinCode,
          },
        });

        if (res && res.success === true) {
          await dispatch({
            type: 'user/getWallet',
            payload: {
              coin_code: coinCode,
            },
          });

          await dispatch({
            type: 'withdrawal/getList',
            payload: {
              coin_code: coinCode,
            },
          });

          message.success(res.data);
          onCancel();
        }
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  const onAllClick = () => {
    form.setFieldsValue({
      amount: parseFloat(formatAmount(wallet.coin_amount)),
    });

    form.validateFields();
  };

  const onCancel = () => {
    form.resetFields();
    props.onCancel();
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['withdrawal/create'],
  );

  const WithdrawalFooter = (
    <div className="tw-flex tw-justify-between tw-items-center">
      {user_config.withdrawal_auto_enabled === false && (
        <Space className="tw-text-gray-600">
          <InfoCircleOutlined />
          <span>当前账户可开启自动提现。</span>
          <Link to="/setting?tab=withdrawal">
            前往开启
            <ArrowRightOutlined />
          </Link>
        </Space>
      )}
      <div>
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          提交
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      title="提现申请"
      visible={visible}
      onCancel={onCancel}
      centered
      maskClosable={false}
      destroyOnClose
      footer={WithdrawalFooter}
    >
      <Space>
        <Statistic
          title={`账户余额（${wallet.coin_code}）`}
          value={formatAmount(wallet.coin_amount)}
        />
        <Divider type="vertical" />
        <Statistic title="费率" value={`${user_config.rate * 100}%`} />
      </Space>
      <Divider dashed />
      <Form
        form={form}
        name="withdrawal"
        layout="vertical"
        initialValues={{
          amount: '',
          address: '',
        }}
        autoComplete="off"
      >
        <Form.Item label="金额">
          <Input.Group compact>
            <Form.Item
              noStyle
              name="amount"
              rules={[
                { required: true, message: '提现金额不能为空' },
                {
                  pattern: /^(?:0|[1-9]\d{0,8})(?:\.\d{0,1}[1-9])?$/,
                  message: '仅支持金额类型，最多两位小数',
                },
              ]}
            >
              <Input
                placeholder="请输入金额类型，最多两位小数..."
                style={{ width: 'calc(100% - 99px)' }}
              />
            </Form.Item>
            <Button onClick={onAllClick} style={{ width: '100px' }}>
              全部提现
            </Button>
          </Input.Group>
        </Form.Item>
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
          <Input placeholder="请输入波场网络以 T 开头的地址..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(WithdrawalForm);
