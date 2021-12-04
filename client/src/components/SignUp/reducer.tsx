import { nameValidate, emailValidate, passwordValidate } from 'util/validate';

type SignupErrMessage = {
  nameErrMessage: string;
  emailErrMessage: string;
  passwordErrMessage: string;
  passwordCheckMessage: string;
  nameValidata: boolean;
  emailValidata: boolean;
  passwordValidata: boolean;
  passwordCheckValidata: boolean;
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
  nameValidata: false,
  emailValidata: false,
  passwordValidata: false,
  passwordCheckValidata: false,
};

export const errMessageReducer = (state: SignupErrMessage, action: Action) => {
  switch (action.type) {
    case 'NAME': {
      if (action.name === '') {
        return {
          ...state,
          nameErrMessage: '필수 입력사항입니다',
          nameValidata: false,
        };
      }
      if (!nameValidate(action.name)) {
        return {
          ...state,
          nameErrMessage: '두글자 이상인 한글과 영어로만 입력해주세요',
          nameValidata: false,
        };
      }
      return { ...state, nameErrMessage: '', nameValidata: true };
    }
    case 'EMAIL': {
      if (action.email === '') {
        return {
          ...state,
          emailErrMessage: '필수 입력 사항입니다',
          emailValidata: false,
        };
      }
      if (!emailValidate(action.email)) {
        return {
          ...state,
          emailErrMessage: '이메일 형식으로 입력해주세요',
          emailValidata: false,
        };
      }

      if (action.overlap === 401) {
        return {
          ...state,
          emailErrMessage: '사용 혹은 탈퇴된 이메일 입니다',
          emailValidata: false,
        };
      }
      return { ...state, emailErrMessage: '', emailValidata: true };
    }
    case 'PASSWORD': {
      if (action.password === '') {
        return {
          ...state,
          passwordErrMessage: '필수 입력 사항입니다',
          passwordValidata: false,
        };
      }
      if (!passwordValidate(action.password)) {
        return {
          ...state,
          passwordErrMessage: '8~20자의 영문&숫자 조합만 사용 가능합니다',
          passwordValidata: false,
        };
      }

      return { ...state, passwordErrMessage: '', passwordValidata: true };
    }
    case 'PASSWORDCHECK': {
      if (action.passwordCheck === '') {
        return {
          ...state,
          passwordCheckMessage: '필수 입력 사항입니다',
          passwordCheckValidata: false,
        };
      }

      if (action.passwordCheck !== action.password) {
        return {
          ...state,
          passwordCheckMessage: '비밀번호와 일치하지 않습니다',
          passwordCheckValidata: false,
        };
      }
      return {
        ...state,
        passwordCheckMessage: '',
        passwordCheckValidata: true,
      };
    }
    default: {
      throw new Error('Unhandled action');
    }
  }
};
