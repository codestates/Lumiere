import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { BiSearch, BiHeart } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HeaderContainer, HambugerBtn, LogoBox, IconBox } from './styled';
import Nav from '../Nav/Nav';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuBox = () => {
    setShowMenu(!showMenu);
  };
  return (
    <HeaderContainer>
      <HambugerBtn onClick={showMenuBox}>
        <HiMenuAlt1 />
      </HambugerBtn>
      <LogoBox>
        <Link to="/">
          <img src="/images/logo.png" alt="루미에르 로고" />
        </Link>
      </LogoBox>
      {showMenu && <Nav />}
      {/* <Nav /> */}
      <IconBox>
        <div>
          <BiSearch />
        </div>
        <Link to="/cart">
          <AiOutlineShoppingCart />
        </Link>
        <Link to="/mypage/zzim">
          <BiHeart />
        </Link>
      </IconBox>
    </HeaderContainer>
  );
};
export default Header;
