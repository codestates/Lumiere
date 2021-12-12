import { useEffect } from 'react';
import instance from 'util/axios';

const Callback = () => {
  // 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code) {
      instance
        .get(`/oauth/kakao?code=${code}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          window.location.assign('/error');
        });
    }
  }, []);

  return <img src="/images/loading.svg" alt="Loading" />;
};

export default Callback;
