export interface UserOrder {
  id: number;
  customerName: string;
  email: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: Date;
  total: number;
}
