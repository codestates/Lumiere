import { atom } from 'recoil';

export const IsDisableBtnState = atom<boolean>({
  key: 'BtnState',
  default: false,
});
