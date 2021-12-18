import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { ZzimArtistsType } from 'util/type';
import { ZzimArtistsList } from './ZzimArtistsList';
import { ZzimArtistsFilter } from './ZzimArtistsFilter';
import { ZzimArtistsContainer } from './styled';
import { LoadingZzimArtists } from './Loading';
import { ZzimArtistsDummy } from './dummy';

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZzimArtists = ({ isLoading, setIsLoading }: Props) => {
  const [checkBoxList, setCheckBoxList] = useState<string[]>([]);
  const [artistsState, setArtistsState] = useState<Array<ZzimArtistsType>>([]);

  useEffect(() => {
    setIsLoading(true);
    instance.get('/artists/zzim').then((res) => {
      setArtistsState(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <ZzimArtistsContainer>
      <ZzimArtistsFilter
        checkBoxList={checkBoxList}
        setCheckBoxList={setCheckBoxList}
        setArtistsState={setArtistsState}
        artistsState={artistsState}
      />
      {isLoading ? (
        ZzimArtistsDummy.map((product) => (
          <LoadingZzimArtists key={product.id} />
        ))
      ) : (
        <ZzimArtistsList
          artistsState={artistsState}
          checkBoxList={checkBoxList}
          setCheckBoxList={setCheckBoxList}
          setArtistsState={setArtistsState}
        />
      )}
    </ZzimArtistsContainer>
  );
};
export default ZzimArtists;
