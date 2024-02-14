export default interface Payments {
  payment_id: string;
  order_id: string;
  signature: string;
  amount: number;
  created_at: string;
}
