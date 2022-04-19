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
          type: 'address/add',
          payload: values,
        });

        if (res && res.success === true) {
          message.success('新增地址成功');
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
    (state: any) => state.loading.effects['address/add'],
  );

  return (
    <Modal
      title="新增地址"
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
          label="地址"
          name="address"
          rules={[
            { required: true, message: '地址不能为空' },
            {
              pattern: /^T[0-9a-zA-Z]{33}$/i,
              message: '仅支持波场网络以 T 开头的地址',
            },
          ]}
        >
          <Input
            placeholder="请输入波场网络以 T 开头的地址..."
            maxLength={34}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(FormAdd);
