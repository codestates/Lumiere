import { nameValidate, emailValidate, passwordValidate } from 'util/validate';

type SignupErrMessage = {
  nameErrMessage: string;
  emailErrMessage: string;
  passwordErrMessage: string;
  passwordCheckMessage: string;
};

type Action =
  | { type: 'NAME'; name: string }
  | { type: 'EMAIL'; email: string; overlap?: number }
  | { type: 'PASSWORD'; password: string }
  | { type: 'PASSWORDCHECK'; passwordCheck: string; password?: string };

export const errMessageState = {
  nameErrMessage: '',
  emailErrMessage: '',
  passwordErrMessage: '',
  passwordCheckMessage: '',
};

export const errMessageReducer = (state: SignupErrMessage, action: Action) => {
  switch (action.type) {
    case 'NAME': {
      if (action.name === '') {
        return { ...state, nameErrMessage: '필수 입력사항입니다' };
      }
      if (!nameValidate(action.name)) {
        return {
          ...state,
          nameErrMessage: '두글자 이상인 한글과 영어로만 입력해주세요',
        };
      }
      return { ...state, nameErrMessage: '사용 가능한 이름 입니다' };
    }
    case 'EMAIL': {
      if (action.email === '') {
        return { ...state, emailErrMessage: '필수 입력 사항입니다' };
      }
      if (!emailValidate(action.email)) {
        return { ...state, emailErrMessage: '이메일 형식으로 입력해주세요' };
      }

      if (action.overlap === 401) {
        return { ...state, emailErrMessage: '사용 혹은 탈퇴된 이메일 입니다' };
      }
      return { ...state, emailErrMessage: '사용 가능한 이메일 입니다' };
    }
    case 'PASSWORD': {
      if (action.password === '') {
        return {
          ...state,
          passwordErrMessage: '필수 입력 사항입니다',
        };
      }
      if (!passwordValidate(action.password)) {
        return {
          ...state,
          passwordErrMessage: '8~20자의 영문&숫자 조합만 사용 가능합니다',
        };
      }

      return { ...state, passwordErrMessage: '사용 가능한 비밀번호 입니다' };
    }
    case 'PASSWORDCHECK': {
      if (action.passwordCheck === '') {
        return {
          ...state,
          passwordCheckMessage: '필수 입력 사항입니다',
        };
      }

      if (action.passwordCheck !== action.password) {
        return {
          ...state,
          passwordCheckMessage: '비밀번호와 일치하지 않습니다',
        };
      }
      return { ...state, passwordCheckMessage: '비밀번호가 일치' };
    }
    default: {
      throw new Error('Unhandled action');
    }
  }
};
