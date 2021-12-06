import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import { ArtListContainer, ArtListWrap } from './styled';

const ArtList = () => {
  return (
    <ArtListContainer>
      <Header />
      <ArtListWrap>
        <FilteringTab />
      </ArtListWrap>
      <Footer />
    </ArtListContainer>
  );
};
export default ArtList;
