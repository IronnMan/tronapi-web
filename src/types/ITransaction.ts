import { COIN_TYPE, CURRENCY_TYPE } from '@/configs/enum';
import { TRANSACTION_STATUS } from '@/configs/transaction';

export default interface ITransaction {
  id: string;
  order_id: string;
  customer_id: string;
  product_name: string;
  currency: CURRENCY_TYPE;
  amount: number;
  coin_code: COIN_TYPE;
  coin_amount: number;
  coin_address: string;
  status: TRANSACTION_STATUS;
  status_time: string;
  create_time: string;
  expire_time: string;
  user_transaction_refund: any;
  user_transaction_webhooks: Array<any>;
  transactions: Array<any>;
}
