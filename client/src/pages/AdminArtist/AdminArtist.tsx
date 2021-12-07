/* eslint no-underscore-dangle: 0 */
import { useEffect, useState } from 'react';
import adminInstance from 'util/axios';
import { Artists, ArtistsProduct, Product } from 'util/type';
import { v4 as uuidv4 } from 'uuid';
import { ModalBackDrop } from 'components/Modal/styled';
import AdminEnrollArtist from 'components/Modal/AdminEnrollArtist';
import AdminArtistEdit from 'components/Modal/AdminEditArtist';
import AdminHeader from 'components/Header/AdminHeader';
import AdminEnrollProduct from 'components/Modal/AdminEnrollProduct';
import { Table, TableWrap, EnrollmentButton, AdminHeaderWrap } from './styled';

const AdminArtist = () => {
  const [artistList, setArtistList] = useState<Array<Artists>>([]);
  const [isEnrollArtist, setIsEnrollArtist] = useState<boolean>(false);
  const [isEnrollProduct, setIsEnrollProduct] = useState<boolean>(false);
  const [isEditArtist, setIsEditArtist] = useState<boolean>(false);
  const [clickArtist, setClickArtist] = useState<ArtistsProduct>({
    code: '',
    name: '',
    aka: '',
    record: '',
    thumbnail: '',
    joinAt: new Date(),
    countOfWorks: 1,
    isActive: true,
    artCode: '',
    title: '',
    image: '',
    theme: '',
    info: {
      details: '',
      size: '',
      canvas: 0,
      createdAt: '',
    },
    price: 0,
  });
  const [clickEdit, setClickEdit] = useState<Artists>({
    code: '',
    name: '',
    aka: '',
    record: '',
    thumbnail: '',
    joinAt: new Date(),
    countOfWorks: 1,
    isActive: true,
    _id: '',
  });
  useEffect(() => {
    adminInstance
      .get<Artists>('/artists')
      .then((res) => setArtistList([res.data].flat()));
  }, []);

  const isEnrollArtistHandler = () => {
    setIsEnrollArtist(!isEnrollArtist);
  };

  const isEditArtistHandler = () => {
    setIsEditArtist(!isEditArtist);
  };

  const isEnrollProductHandler = () => {
    setIsEnrollProduct(!isEnrollProduct);
  };

  const clickArtistHandler = (el: Artists) => {
    setClickEdit(el);
    isEditArtistHandler();
  };

  const clickArtistHandler2 = (el: Artists) => {
    setClickEdit(el);
    isEnrollProductHandler();
  };

  const discontinuanceHandler = (el: Artists) => {
    adminInstance
      .patch('/artists', { artistId: el._id, isActive: !el.isActive })
      .then(() => {
        alert(el.isActive ? '비활성화 완료' : '활성화 완료');
        window.location.reload();
      })
      .catch((err) => {
        alert('에러발생');
        console.log(err);
      });
  };

  return (
    <AdminHeaderWrap>
      <AdminHeader />
      {/* <Link to="/"></Link> */}
      <h1>작가 관리</h1>
      <EnrollmentButton type="button" onClick={isEnrollArtistHandler}>
        작가등록
      </EnrollmentButton>
      <TableWrap>
        <Table>
          <tbody>
            <tr>
              <td>고유번호</td>
              <td>대표 작품</td>
              <td>작가명</td>
              <td>활동명(영문)</td>
              <td>작가소개</td>
              <td>등록일</td>
              <td>작품수</td>
              <td>활동여부</td>
              <td>관리</td>
            </tr>
          </tbody>
          {artistList.map((el) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>
                    <div>A{el.code}</div>
                  </td>
                  <td>
                    <img src={el.thumbnail} alt="작품이미지" width="200rem" />
                  </td>
                  <td>
                    <div>{el.name}</div>
                  </td>
                  <td>
                    <div>{el.aka}</div>
                  </td>
                  <td>
                    <div>{el.record}</div>
                  </td>
                  <td>
                    <div>
                      {el.joinAt
                        .toString()
                        .split('-')
                        .join('/')
                        .split('T')
                        .join(' ')
                        .slice(2)
                        .slice(0, -5)}
                    </div>
                  </td>
                  <td>
                    <div>{el.countOfWorks}</div>
                  </td>
                  <td>
                    <div>{el.isActive ? 'O' : 'X'}</div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => clickArtistHandler2(el)}
                    >
                      작품등록
                    </button>
                    <button
                      type="button"
                      onClick={() => clickArtistHandler(el)}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => discontinuanceHandler(el)}
                    >
                      활성화/비활성화
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </TableWrap>
      {/* Modal */}
      {isEnrollArtist && (
        <ModalBackDrop onClick={isEnrollArtistHandler}>
          <AdminEnrollArtist
            NO={isEnrollArtistHandler}
            el={clickArtist}
            HowManyArtists={artistList.length + 1}
          />
        </ModalBackDrop>
      )}
      {isEditArtist && (
        <ModalBackDrop onClick={isEditArtistHandler}>
          <AdminArtistEdit NO={isEditArtistHandler} el={clickEdit} />
        </ModalBackDrop>
      )}
      {isEnrollProduct && (
        <ModalBackDrop onClick={isEnrollProductHandler}>
          <AdminEnrollProduct NO={isEnrollProductHandler} el={clickEdit} />
        </ModalBackDrop>
      )}
    </AdminHeaderWrap>
  );
};
export default AdminArtist;
