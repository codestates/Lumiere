import MypageOrderMenu from './MyPageOrderMenu';
import MypageOrderList from './MyPageOrderList';
import { OrderHistoryContainer } from './styled';

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderHistory = ({ isLoading, setIsLoading }: Props) => {
  return (
    <OrderHistoryContainer>
      <MypageOrderMenu />
      <MypageOrderList isLoading={isLoading} setIsLoading={setIsLoading} />
    </OrderHistoryContainer>
  );
};
export default OrderHistory;
