import MypageOrderMenu from './MyPageOrderMenu';
import MypageOrderList from './MyPageOrderList';
import { OrderHistoryContainer } from './styled';

const OrderHistory = () => {
  return (
    <OrderHistoryContainer>
      <MypageOrderMenu />
      <MypageOrderList />
    </OrderHistoryContainer>
  );
};
export default OrderHistory;
