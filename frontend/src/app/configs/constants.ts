export const apiResponse = {
  genericResponse: 'Something happened, please try again later.',
};

export const form = {
  email: 'email',
  lastName: 'lastName',
  firstName: 'firstName',
  userName: 'userName',
  password: 'password',
  confirmPassword: 'confirmPassword',
  emailPattern:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  numberPattern: /\d/,
  capitalCasePattern: /[A-Z]/,
  lowerCasePattern: /[a-z]/,
  specialCharacterPattern:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};

export const urls = {
  signup: '/merchants/signup',
  login: '/merchants/signin',
};
