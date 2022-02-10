import React from 'react';
import {
  Form,
  Space,
  Input,
  Tag,
  Select,
  Button,
  Divider,
  Alert,
  message,
} from 'antd';
import find from 'lodash.find';
import filter from 'lodash.filter';
import uniqueId from 'lodash.uniqueid';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { TRANSACTION_PARTIAL_HANDLER } from '@/configs/transaction';
import { TRANSACTION_PARTIAL_HANDLER_OPTIONS } from '@/configs/options';
import { SETTING_TYPE } from '@/configs/setting';
import Validator from '@/utils/validator';

const { Option } = Select;

interface IHANDLER {
  id: string;
  threshold: string | undefined;
  handler: TRANSACTION_PARTIAL_HANDLER;
}

interface IProps {
  onSubmit: (values: any) => void;
  data: any;
  loading: boolean;
}

const MAX_HANDLER_COUNT = 2;

const Transaction: React.FC<IProps> = (props) => {
  const { data, loading } = props;

  const [items, setItems] = React.useState<Array<IHANDLER>>([]);

  React.useEffect(() => {
    const initItems: Array<IHANDLER> = [];
    if (data && data.length) {
      data.forEach((item: any) => {
        initItems.push({
          ...item,
          id: uniqueId(),
        });
      });

      initItems.sort((a: any, b: any) => {
        return parseFloat(a.threshold) - parseFloat(b.threshold) > 0 ? 1 : -1;
      });
    }

    setItems(initItems);
  }, [data]);

  const onAddClick = () => {
    if (items.length >= MAX_HANDLER_COUNT) {
      message.warning(`最多添加 ${MAX_HANDLER_COUNT} 条配置信息`);
      return;
    }

    let newItemHandler = TRANSACTION_PARTIAL_HANDLER.DONE;
    let newItemThreshold = '5';

    if (items.length) {
      const [firstItem] = items;
      const { handler } = firstItem;
      newItemHandler =
        handler === TRANSACTION_PARTIAL_HANDLER.DONE
          ? TRANSACTION_PARTIAL_HANDLER.REFUND
          : TRANSACTION_PARTIAL_HANDLER.DONE;

      newItemThreshold = '95';
    }

    const newItem: IHANDLER = {
      id: uniqueId(),
      handler: newItemHandler,
      threshold: newItemThreshold,
    };
    setItems([...items, newItem]);
  };

  const onRemoveClick = (id: string) => {
    const newItems = filter(items, (item: IHANDLER) => {
      return item.id !== id;
    });
    setItems(newItems);
  };

  const onThresholdValueChange = (e: any, id: string) => {
    const item = find(items, (item: IHANDLER) => item.id === id);
    item.threshold = e.target.value;
    setItems([...items]);
  };

  const onThresholdTypeChange = (e: any, id: string) => {
    const item = find(items, (item: IHANDLER) => item.id === id);
    item.handler = e;
    setItems([...items]);
  };

  const onSubmit = () => {
    let validated = true;

    if (items && items.length) {
      const thresholdMap = new Map();
      const handlerMap = new Map();

      for (const item of items) {
        const { threshold, handler } = item;

        if (!threshold) {
          message.warning('百分比数值不能为空');
          validated = false;
          break;
        }

        if (!Validator.percentageValidator(threshold)) {
          message.warning('百分比数值格式不正确。最低 0.01，最高 99.99');
          validated = false;
          break;
        }

        if (thresholdMap.has(threshold)) {
          message.warning('百分比数值不能重复');
          validated = false;
          break;
        }

        thresholdMap.set(threshold, true);

        if (handlerMap.has(handler)) {
          message.warning('自动处理逻辑不能重复');
          validated = false;
          break;
        }

        handlerMap.set(handler, true);
      }
    }

    if (validated === true) {
      props.onSubmit({
        config: items,
        type: SETTING_TYPE.TRANSACTION,
      });
    }
  };

  return (
    <>
      <Form
        name="transaction"
        layout="vertical"
        initialValues={{
          handler_type: TRANSACTION_PARTIAL_HANDLER.DONE,
        }}
        autoComplete="off"
      >
        <Form.Item noStyle>
          {items.length
            ? items.map((item) => {
                return (
                  <div key={item.id} className="tw-mb-3">
                    <span>当</span>
                    <Tag className="tw-mx-2">支付金额</Tag>
                    <span>低于</span>
                    <Tag className="tw-mx-2">订单金额</Tag>
                    <Input
                      value={item.threshold}
                      placeholder="请输入"
                      onChange={(e) => onThresholdValueChange(e, item.id)}
                      style={{ width: '110px' }}
                      addonAfter="%"
                    />
                    <span className="tw-mx-2">时，自动处理为：</span>
                    <Select
                      style={{ width: '110px' }}
                      value={item.handler}
                      placeholder="请选择"
                      onChange={(e) => onThresholdTypeChange(e, item.id)}
                    >
                      {TRANSACTION_PARTIAL_HANDLER_OPTIONS.map(
                        (item, index) => {
                          return (
                            <Option value={item.value} key={index}>
                              {item.label}
                            </Option>
                          );
                        },
                      )}
                    </Select>
                    <Button
                      className="tw-mx-2"
                      shape="circle"
                      size="small"
                      onClick={() => onRemoveClick(item.id)}
                      icon={<MinusOutlined />}
                    ></Button>
                  </div>
                );
              })
            : null}
        </Form.Item>

        {items.length < MAX_HANDLER_COUNT ? (
          <Form.Item>
            <Button
              type="dashed"
              block
              style={{
                width: '550px',
              }}
              onClick={onAddClick}
              icon={<PlusOutlined />}
            ></Button>
          </Form.Item>
        ) : null}

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
        <h4>关于配置</h4>
        <ol>
          <li>上述配置用于自动处理当用户支付金额低于订单金额的情况。</li>
          <li>
            如未配置，当出现上述情况时，你可以：
            <ul>
              <li>
                要求用户支付余下未支付的金额，系统会合并付款并更新订单状态。
              </li>
              <li>前往订单详情页面，手动进行处理。</li>
            </ul>
          </li>
          <li>最多添加 {MAX_HANDLER_COUNT} 条配置信息。</li>
        </ol>

        <h4>关于处理为“完成”</h4>
        <ol>
          <li>
            系统会自动将订单标记为完成并发送回调通知，商户的钱包会累积用户已支付的金额。
          </li>
        </ol>

        <h4>关于处理为“退款”</h4>
        <ol>
          <li>
            系统会自动将用户已支付的金额，退款至相关交易的发送地址。关联的订单会变更为退款状态。
          </li>
        </ol>
      </div>
    </>
  );
};

export default Transaction;
