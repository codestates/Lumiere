import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import { ArtListContainer } from './styled';

const ArtList = () => {
  return (
    <ArtListContainer>
      <Header />
      <FilteringTab />
      <Footer />
    </ArtListContainer>
  );
};
export default ArtList;
