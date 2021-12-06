import {
  FooterContainer,
  FooterWrap,
  TeamInfoBox,
  SiteInfoBox,
} from './styled';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <TeamInfoBox>
          <li>
            <h3>&middot; Minimanimo</h3>
            <span>Creative. Attractive.</span>
            <span>Born in Seoul 21.</span>
          </li>
          <li>
            <h3>&middot; Team</h3>
            <a href="https://github.com/linehyang">JungHun Kim</a>
            <a href="https://github.com/heartane">GaRam Jin</a>
            <a href="https://github.com/developerjhp">JinHyun Park</a>
            <a href="https://github.com/devTiana">SoHun Choi</a>
          </li>
        </TeamInfoBox>
        <SiteInfoBox>
          <h1>LUMIERE</h1>
          <div>Minimanimo @ 2021</div>
        </SiteInfoBox>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
