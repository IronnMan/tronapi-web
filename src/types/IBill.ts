export default interface IBill {
  id: string;
  merchant_id: string;
  merchant_transaction_id: string;
  amount_transaction: string;
  amount_fee: string;
  rate: number;
  balance: number;
  create_time: string;
}
