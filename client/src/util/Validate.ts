export const EmailValidate = (email: string) => {
  const validate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (validate.test(email)) {
    return true;
  }
  return false;
};

// a~z, 숫자 8~20자 (대문자 필수 아님)
export const PasswordValidate = (password: string) => {
  const validate = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

  if (validate.test(password)) {
    return true;
  }

  return false;
};
