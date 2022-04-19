import React, { useEffect, useCallback } from 'react';
import { Form, Divider, Select, DatePicker, Button, Input } from 'antd';
import moment from 'moment';
import { SEARCH_STATUS_OPTIONS } from '@/configs/options';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface IProps {
  data: {
    keyword: string;
    status: boolean | null;
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
      className="tw-hidden xl:tw-flex"
    >
      <Form.Item label="关键字" name="keyword">
        <Input
          placeholder="订单编号、产品名称、用户编号等..."
          max={128}
          style={{
            width: 280,
          }}
        />
      </Form.Item>
      <Form.Item label="支付状态" name="status">
        <Select style={{ width: '120px' }} allowClear placeholder="请选择">
          {SEARCH_STATUS_OPTIONS.map((status, index) => {
            return (
              <Option key={index} value={status.value}>
                {status.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="创建时间" name="dateRange">
        <RangePicker
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          查询
        </Button>
        <Divider type="vertical" />
        <Button onClick={onReset}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(ListSearch);
