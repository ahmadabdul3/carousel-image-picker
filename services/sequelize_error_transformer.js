//
// - an example error object from sequelize looks like the following:
// {
//   message: 'email must be unique',
//   type: 'unique violation',
//   path: 'email',
//   value: 'pam.beesly@dunder.com',
//   origin: 'DB',
//   instance: null,
//   validatorKey: 'not_unique',
//   validatorName: null,
//   validatorArgs: []
// }
//

const FALLBACK_ERROR_MESSAGE = 'An unexpected error occured, please try again or contact the service provider';
const NAME = 'Sequelize';
export const UNIQUE_ERROR = 'unique violation';
export const VALIDATION_ERROR = 'Validation error';

// - we will need to make a switch statement with a case for each
//   e.name value from sequelize because their error classes are
//   not all consistent - some have e.errors, other have e.message,
//   and other have e.parent
// - here's the sequelize file for error data structures for reference:
//   https://github.com/sequelize/sequelize/blob/master/lib/errors/index.js
export function makeErrorsFriendly(e) {
  if (e.customMessage) return handleCustomMessage(e);
  else if (e.errors) return handleErrorsObject(e.errors);
  else if (e.parent) return e.parent;
  else return e.name;
}

export function isSequelizeError(e) {
  return (e.name && e.name.includes(NAME));
}

export function sequelizeError(error) {
  const { type, path, value, customMessage } = error;
  return {
    name: NAME,
    errors: [{ type, path, value }],
    customMessage,
  };
}

export function sequelizeErrorUniqueness(error) {
  const { path, value, customMessage } = error;
  return sequelizeError({
    type: UNIQUE_ERROR,
    path,
    value,
    customMessage,
  });
}

// *** PRIVATE API ***
//
// - below here the function are the equivalent of 'private' methods,
//   i.e. not exported / only used in this file

function handleCustomMessage(error) {
  return [{
    message: error.customMessage,
    field: error.path,
    type: error.type,
  }];
}

function handleErrorsObject(errors) {
  return errors.map(error => {
    return {
      message: getErrorFromType(error),
      field: error.path,
      type: error.type,
    };
  });
}

function getErrorFromType(error) {
  switch (error.type) {
    case UNIQUE_ERROR:
      return uniquenessError(error);
    case VALIDATION_ERROR:
      return validationError(error);
    default:
      return FALLBACK_ERROR_MESSAGE;
  }
}

function uniquenessError(error) {
  const { path, value } = error;
  return `The provided ${path} (${value}) already exists, please choose another`;
}

function validationError(error) {
  const { path, value, validatorKey } = error;

  switch (validatorKey) {
    case 'len':
      return 'The provided value does not meet the necessary length requirements';
    default: FALLBACK_ERROR_MESSAGE;
  }
}
