/* eslint no-underscore-dangle: 0 */
import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { Users, AdminUsersType } from 'util/type';
import { v4 as uuidv4 } from 'uuid';
import Header from 'components/Header/Header';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { ModalBackDrop } from 'components/Modal/styled';
import YesNoModal from 'components/Modal/YesNoModal';
import PageNation from 'components/PageNation/PageNation';
import { Table, TableWrap, AdminHeaderWrap } from './styled';

const AdminUser = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [curPage, setCurPage] = useState<number>(1);
  const [userList, setUserList] = useState<AdminUsersType>({
    users: [
      {
        general: {
          email: '',
        },
        active: {
          isClosed: false,
          lastAccessTime: new Date(),
        },
        _id: '',
        name: '',
        createdAt: new Date(),
      },
    ],
    page: 0,
    pages: 0,
  });
  const [isResign, setIsResign] = useState<boolean>(false);
  const [clickResign, setClickResign] = useState<Users>({
    general: {
      email: '',
    },
    active: {
      isClosed: false,
      lastAccessTime: new Date(),
    },
    _id: '',
    name: '',
    createdAt: new Date(),
  });
  useEffect(() => {
    instance
      .get<AdminUsersType>('/users')
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  }, []);

  const isResignHandler = () => {
    setIsResign(!isResign);
  };

  const clickResignHandler = (el: Users) => {
    setIsResign(!isResign);
    setClickResign(el);
  };
  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    instance
      .get<AdminUsersType>('/users', { params: { pageNumber: page } })
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  };

  const resignHandler = () => {
    instance
      .delete('/users/profile', { params: { userId: clickResign._id } })
      .then((res) => {
        alert(`${res.data.message}`);
        window.location.reload();
      })
      .catch((err) => {
        alert(`${err.response.data.message}`);
        window.location.reload();
      });
  };
  return (
    <AdminHeaderWrap>
      <Header />
      <h1>유저 관리</h1>
      <PageNation
        curPage={curPage}
        totalPages={userList.pages}
        pageChangeHandler={pageChangeHandler}
      />
      <TableWrap>
        <Table>
          <tbody>
            <tr>
              <td>고유번호</td>
              <td>이메일</td>
              <td>이름</td>
              <td>가입일</td>
              <td>마지막 접속일</td>
              <td>탈퇴 여부</td>
              <td>관리</td>
            </tr>
          </tbody>
          {userList.users.map((el) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>
                    <div>{el._id}</div>
                  </td>
                  <td>
                    <div>{el.general?.email}</div>
                    <div>{el.kakao?.email}</div>
                    <div>{el.google?.email}</div>
                    <div>{el.naver?.email}</div>
                    <div>{el.general ? '(일반)' : ''}</div>
                    <div>{el.kakao ? '(카카오)' : ''}</div>
                    <div>{el.naver ? '(네이버)' : ''}</div>
                    <div>{el.google ? '(구글)' : ''}</div>
                  </td>
                  <td>
                    <div>{el.name}</div>
                  </td>
                  <td>
                    <div>
                      {el.createdAt
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
                    {el.active.lastAccessTime
                      ? el.active.lastAccessTime
                          .toString()
                          .split('-')
                          .join('/')
                          .split('T')
                          .join(' ')
                          .slice(2)
                          .slice(0, -5)
                      : el.active.lastAccessTime}
                  </td>
                  <td>{el.active.isClosed ? 'O' : ''}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => clickResignHandler(el)}
                    >
                      탈퇴
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </TableWrap>
      {isResign && (
        <ModalBackDrop onClick={isResignHandler}>
          <YesNoModal
            NO={isResignHandler}
            YES={resignHandler}
            MESSAGE="해당 유저를"
            MESSAGE2="탈퇴시키겠습니까?"
          />
        </ModalBackDrop>
      )}
    </AdminHeaderWrap>
  );
};
export default AdminUser;
