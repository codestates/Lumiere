type SignupInfo = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
};

type Action =
  | { type: 'NAME' }
  | { type: 'EMAIL' }
  | { type: 'PASSWORD' }
  | { type: 'PASSWORDCHECK' };

export const errMessageState = {
  name: '',
  email: '',
  password: '',
  passwordCheck: '',
};

export const errMessageReducer = (state: SignupInfo, action: Action) => {
  switch (action.type) {
    case 'NAME': {
      return {
        ...errMessageState,
        name: '1234',
      };
    }
    case 'EMAIL': {
      return {
        ...errMessageState,
        name: '1234',
      };
    }
    case 'PASSWORD': {
      return {
        ...errMessageState,
        name: '1234',
      };
    }
    case 'PASSWORDCHECK': {
      return {
        ...errMessageState,
        name: '1234',
      };
    }
    default: {
      throw new Error('Unhandled action');
    }
  }
};
