/* eslint no-underscore-dangle: 0 */
import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { Users, AdminUsersType } from 'util/type';
import { v4 as uuidv4 } from 'uuid';
import AdminHeader from 'components/Header/AdminHeader';
import { ModalBackDrop } from 'components/Modal/styled';
import YesNoModal from 'components/Modal/YesNoModal';
import PageNation from 'components/PageNation/PageNation';
import { Table, TableWrap, AdminHeaderWrap } from './styled';

const AdminUser = () => {
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
    instance.get<AdminUsersType>('/users').then((res) => {
      setUserList(res.data);
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
        console.log(err);
      });
  };

  const resignHandler = () => {
    instance
      .patch(
        '/users/',
        {
          isClosed: true,
          lastAccessTime: new Date(),
        },
        { params: { userId: clickResign._id } },
      )
      .then(() => {
        alert('탈퇴완료');
        window.location.reload();
      })
      .catch((err) => {
        alert('이미 탈퇴한 회원이거나 일시적인 오류입니다.');
        window.location.reload();
        console.log(err);
      });
  };
  return (
    <AdminHeaderWrap>
      <AdminHeader />
      {/* <Link to="/"></Link> */}
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
                    <div>{el.general.email}</div>
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
