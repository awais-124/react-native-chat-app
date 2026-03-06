const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPLASH_TIMEOUT = 3000;

const signUpData = {
  name: '',
  phone: '',
  email: '',
  password: '',
  birthday: '',
};

const ModalMessage = {
  forgotPass: 'Email found. Now you can reset your password successfully!',
  resetPass: 'Your password has been reset successfully!',
  signUpPin: 'Yay! Your PIN code has been created. Continue to B-Wallet!',
};

const CONSTANTS = {
  SPLASH_TIMEOUT,
  emailRegex,
  ModalMessage,
  signUpData,
};

export default CONSTANTS;
