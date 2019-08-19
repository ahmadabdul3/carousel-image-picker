

export function generateValidationStateForForm({ formFields={} }) {
  const formState = Object.keys(formFields).reduce((state, field) => {
    state[field + 'Message'] = '';
    return state;
  }, {});

  formState.formMessage = '';
  return formState;
}

export function validateRequiredFields({
  requiredFields,
  state,
}) {
  let isValid = true;

  const errors = requiredFields.reduce((errors, field) => {
    const value = state[field];

    if (!value) {
      isValid = false;
      errors[field + 'Message'] = 'This field is required';
    } else {
      errors[field + 'Message'] = '';
    }

    return errors;
  }, {});

  return { errors, isValid };
}

export function handleManyValidations({ validationFunctions }) {
  let isValid = true;
  let errors = {};

  validationFunctions.forEach(func => {
    const validationResult = func();
    if (!validationResult.isValid) {
      isValid = false;
      errors = {
        ...errors,
        ...validationResult.errors,
      };
    }
  });

  if (!isValid) throw errors;
}
