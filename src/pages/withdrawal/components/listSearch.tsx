import React, { useEffect, useCallback } from 'react';
import { Form, DatePicker, Button } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

interface IProps {
  data: {
    dateRange: Array<any>;
  };
  onSubmit: (values: any) => void;
  onReset: () => void;
}

const ListSearch: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const { data } = props;

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onSubmit = useCallback(() => {
    const fieldValues = form.getFieldsValue();
    props.onSubmit(fieldValues);
  }, []);

  const onReset = useCallback(() => {
    form.resetFields();
    props.onReset();
  }, []);

  return (
    <Form
      layout="inline"
      name="search"
      form={form}
      className="tw-hidden sm:tw-flex"
    >
      <Form.Item label="创建时间" name="dateRange">
        <RangePicker
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={onReset}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ListSearch);
