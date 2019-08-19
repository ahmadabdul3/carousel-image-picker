
const FORM_VALIDATION_ERROR_NAME = 'errorFormValidation';
const LOGIN_ERROR_NAME = 'errorLogin';
const SIGNUP_ERROR_NAME = 'errorSignup';
const ERROR_NAME_INTERNAL_SERVER = 'internalServerError';

export function createError({ httpStatus, name, message, friendlyMessage }) {
  return {
    httpStatus: httpStatus || 500,
    name,
    message: message || 'There was an error',
    friendlyMessage,
  };
}

export function createErrorFormValidation({ message, friendlyMessage }) {
  const name = FORM_VALIDATION_ERROR_NAME;
  return createError({ name, message, friendlyMessage });
}

export function createErrorLogin({ message, friendlyMessage }) {
  const name = LOGIN_ERROR_NAME;
  return createError({ name, message, friendlyMessage });
}

export function createErrorSignup({ message, friendlyMessage }) {
  const name = SIGNUP_ERROR_NAME;
  return createError({ name, message, friendlyMessage });
}

export function createErrorInternalServer() {
  const name = ERROR_NAME_INTERNAL_SERVER;
  const message = 'Internal server error';
  const friendlyMessage = 'Oops, there was an error! This is our fault, not yours.'
    + ' If you keep running into problems please email us at ...';
  return createError({ httpStatus: 500, name, message, friendlyMessage });
}

export function errorHasFriendlyMessage({ error }) {
  return error.friendlyMessage;
}
