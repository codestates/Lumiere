/* eslint no-underscore-dangle: 0 */
import { useEffect, useState } from 'react';
import adminInstance from 'util/axios';
import { Artists, Order } from 'util/type';
import { v4 as uuidv4 } from 'uuid';
import { useComma, convertDeliverStatus } from 'util/functions';
import AdminHeader from 'components/Header/AdminHeader';
import { Table, TableWrap, EnrollmentButton, AdminHeaderWrap } from './styled';

const AdminArtist = () => {
  const [artistList, setArtistList] = useState<Array<Artists>>([]);
  useEffect(() => {
    adminInstance
      .get<Artists>('/artists')
      .then((res) => setArtistList([res.data].flat()));
  }, []);

  console.log(artistList.map((el) => el));
  return (
    <AdminHeaderWrap>
      <AdminHeader />
      {/* <Link to="/"></Link> */}
      <h1>작가 관리</h1>
      <EnrollmentButton type="button">작가등록</EnrollmentButton>
      <TableWrap>
        <Table>
          <tbody>
            <tr>
              <td>고유번호</td>
              <td>작가명</td>
              <td>활동명(영문)</td>
              <td>작가소개</td>
              <td>등록일</td>
              <td>작품수</td>
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
                    <div>관리</div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </TableWrap>
    </AdminHeaderWrap>
  );
};
export default AdminArtist;
