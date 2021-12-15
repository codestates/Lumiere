import { MenuContainer, MenuListWrapUl } from './styled';

const MypageOrderMenu = () => {
  return (
    <MenuContainer>
      <MenuListWrapUl>
        <li>주문 번호</li>
        <li>작품 정보</li>
        <li>총 결제 금액</li>
        <li>진행 상태</li>
        <li>관리</li>
      </MenuListWrapUl>
    </MenuContainer>
  );
};
export default MypageOrderMenu;
