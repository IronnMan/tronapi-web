import React from 'react';
import { useDispatch, useHistory, useSelector, history } from 'umi';
import { Button, Descriptions, Result } from 'antd';
import Footer from '@/components/footer';
import { TRON_BROWSER } from '@/configs/tron';
import { COIN_TYPE } from '@/configs/enum';
import { SystemModelState } from '@/models/system';
import { formatAmount, formatDateTime } from '@/utils/formater';
import styles from './test.less';

const TestResultPage: React.FC = () => {
  const dispatch = useDispatch();
  const { location } = useHistory();
  const { query }: any = location;

  React.useEffect(() => {
    dispatch({
      type: 'system/queryTestTransaction',
      payload: {
        order_id: query.order_id,
      },
    });
  }, []);

  const { test_transaction }: SystemModelState = useSelector(
    (state: any) => state.system,
  );

  const extraActions = React.useMemo(() => {
    if (!test_transaction.id) {
      return [];
    }
    const actions = [];
    if (test_transaction.status === true) {
      actions.push(
        <Button
          type="primary"
          key="detail"
          onClick={() =>
            window.open(
              `${
                TRON_BROWSER[test_transaction.coin_code as COIN_TYPE]
              }/transaction/${test_transaction.hash}`,
            )
          }
        >
          订单详情
        </Button>,
      );
    }

    actions.push(
      <Button key="home" onClick={() => history.push('/')}>
        回到首页
      </Button>,
    );

    return actions;
  }, [test_transaction]);

  if (!test_transaction.id) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Result
          status={test_transaction.status === true ? 'success' : 'error'}
          title={test_transaction.status === true ? 'SUCCESS' : 'ERROR'}
          subTitle={
            test_transaction.status === true ? '订单已支付成功' : '订单未支付'
          }
          extra={extraActions}
        >
          <Descriptions
            layout="horizontal"
            column={1}
            size="middle"
            labelStyle={{ width: '120px' }}
          >
            <Descriptions.Item label="订单编号">
              {test_transaction.order_id}
            </Descriptions.Item>
            <Descriptions.Item label="订单金额">
              {formatAmount(test_transaction.amount, test_transaction.currency)}
            </Descriptions.Item>
            <Descriptions.Item label="支付金额">
              {formatAmount(
                test_transaction.coin_amount,
                test_transaction.coin_code,
              )}
            </Descriptions.Item>
            {test_transaction.status === true ? (
              <>
                <Descriptions.Item label="实付金额">
                  {formatAmount(
                    test_transaction.coin_amount_pay,
                    test_transaction.coin_code,
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="完成时间">
                  {formatDateTime(test_transaction.status_time)}
                </Descriptions.Item>
              </>
            ) : null}
          </Descriptions>
        </Result>
      </div>
      <Footer />
    </div>
  );
};

export default TestResultPage;
