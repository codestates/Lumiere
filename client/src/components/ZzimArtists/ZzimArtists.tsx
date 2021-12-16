import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { ZzimArtistsType } from 'util/type';
import { ZzimArtistsList } from './ZzimArtistsList';
import { ZzimArtistsFilter } from './ZzimArtistsFilter';
import { ZzimArtistsContainer } from './styled';

const ZzimArtists = () => {
  const [checkBoxList, setCheckBoxList] = useState<string[]>([]);
  const [artistsState, setArtistsState] = useState<Array<ZzimArtistsType>>([]);
  useEffect(() => {
    instance.get('/artists/zzim').then((res) => {
      console.log(res.data);
      setArtistsState(res.data);
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
      <ZzimArtistsList
        artistsState={artistsState}
        checkBoxList={checkBoxList}
        setCheckBoxList={setCheckBoxList}
        setArtistsState={setArtistsState}
      />
    </ZzimArtistsContainer>
  );
};
export default ZzimArtists;
