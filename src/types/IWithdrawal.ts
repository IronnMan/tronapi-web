import { COIN_TYPE } from '@/configs/enum';
import { WITHDRAWAL_TYPE } from '@/configs/withdrawal';

export default interface IWithdrawal {
  id: string;
  coin_code: COIN_TYPE;
  amount_submit: string;
  amount_send: string;
  amount_fee: string;
  rate: number;
  hash: string;
  address: string;
  type: WITHDRAWAL_TYPE;
  status: string;
  status_time: string;
  create_time: string;
  user_withdrawal_webhooks: Array<any>;
}
