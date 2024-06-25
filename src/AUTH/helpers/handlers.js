import CONSTANTS from './CONSTANTS';

const goBack = 1;

const handleFormValidity = async (email, pass, confirmPass, phone, name) => {
  const isEmpty =
    email.length === 0 ||
    pass.length === 0 ||
    confirmPass.length === 0 ||
    name.length === 0 ||
    phone.length === 0;

  let message = isEmpty
    ? 'Input fields cannot be empty'
    : !CONSTANTS.emailRegex.test(email)
    ? 'Email not valid'
    : pass.length < 6
    ? 'Password length must atleast 6 characters'
    : phone.length < 9
    ? 'Invalid Phone Number. Must be longer than 9 characters'
    : 'Passwords donot match!';

  const isValid =
    !isEmpty &&
    CONSTANTS.emailRegex.test(email) &&
    pass.length >= 6 &&
    phone.length > 9 &&
    pass === confirmPass;

  return {message, isValid};
};

const HANDLERS = {goBack, handleFormValidity};
export default HANDLERS;
