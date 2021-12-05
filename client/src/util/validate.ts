// 이메일 유효성 검사
export const emailValidate = (email: string) => {
  const validate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (validate.test(email)) {
    return true;
  }
  return false;
};

// 비밀번호 유효성 검사a~z, 숫자 8~20자 (대문자 필수 아님)
export const passwordValidate = (password: string) => {
  const validate = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

  if (validate.test(password)) {
    return true;
  }

  return false;
};

// 이름 유효성검사
export const nameValidate = (name: string) => {
  const validate = /^[가-힣a-zA-Z]{2,10}$/;

  if (validate.test(name)) {
    return true;
  }

  return false;
};
