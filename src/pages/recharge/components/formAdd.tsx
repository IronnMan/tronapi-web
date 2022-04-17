import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Modal, Form, Input, message } from 'antd';

interface IProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

const FormAdd: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { visible } = props;

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res: any = await dispatch({
          type: 'recharge/create',
          payload: values,
        });

        if (res && res.success === true) {
          message.success('新增添加成功');
          form.resetFields();
          props.onSuccess();
        }
      })
      .catch((err) => {
        console.info('validate error:', err);
      });
  };

  const handleClose = () => {
    form.resetFields();
    props.onCancel();
  };

  const loading = useSelector(
    (state: any) => state.loading.effects['recharge/create'],
  );

  return (
    <Modal
      title="充值"
      visible={visible}
      onOk={handleSubmit}
      maskClosable={false}
      onCancel={handleClose}
      destroyOnClose={true}
      okButtonProps={{
        loading,
      }}
    >
      <Form
        form={form}
        name="formAddressAdd"
        initialValues={{ address: '' }}
        autoComplete="off"
      >
        <Form.Item
          label="金额"
          name="address"
          rules={[
            { required: true, message: '金额不能为空' },
            {
              pattern:
                /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/i,
              message: '仅支持金额类型，最多两位小数',
            },
          ]}
        >
          <Input placeholder="请输入充值金额..." maxLength={34} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(FormAdd);
