import { atom, selector } from 'recoil';

export const IsSigninState = atom<boolean>({
  key: 'LoginState',
  default: false,
});

export const IsSigninCheck = selector({
  key: 'SigninCheck',
  get: async ({ get }) => {
    const signinState = get(IsSigninState);
    // const localStorage = JSON.parse(localStorage.getItem('lumiereUserinfo')
    if (signinState === false) {
      // 로컬스티로지에 access 토큰 여부 확인하고
      console.log(123);
    } else {
      // false라면 로그인 다시해야됨
      console.log(456);
    }
  },
});
