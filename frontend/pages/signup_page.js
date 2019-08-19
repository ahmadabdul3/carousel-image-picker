import React, { Component } from 'react';
import userClient from 'src/frontend/clients/data_api/user_client';
import FormInput from 'src/frontend/components/form_input';
import appRoutes from 'src/constants/routes';


export default class SignupPage extends Component {
  state = {
    email: '',
    emailMessage: '',
    password: '',
    passwordMessage: '',
    formMessages: [],
  };

  constructor(props) {
    super(props);
  }

  onChange = (field, value) => {
    this.setState({ [field]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ formMessages: [] });

    const validationResult = this.validateInputs();
    if (!validationResult) return;

    const { email, password } = this.state;

    userClient.create({ email, password }).then((res) => {
      if (res.status === 'fail') {
        this.setState({ formMessages: res.messages });
      } else {
        const { router, loginSuccess } = this.props;
        localStorage.setItem('jwt-token', res.jwt);
        loginSuccess(res.user);
        router.push(appRoutes.home);
      }
    });
  }

  validateInputs() {
    const { email, password } = this.state;
    let formValid = true;
    const messages = {};

    if (!email || email.indexOf('@') < 0) {
      messages.emailMessage = 'Please provide a valid email';
      formValid = false;
    } else {
      messages.emailMessage = '';
    }

    if (!password || password.length < 6) {
      messages.passwordMessage = 'Please provide a valid password - 6 characters minimum';
      formValid = false;
    } else {
      messages.passwordMessage = '';
    }

    this.setState({ ...messages });
    return formValid;
  }

  renderFormMessage() {
    const { formMessages } = this.state;

    if (formMessages.length < 1) return null;

    const messages = formMessages.map((message, index) => (
      <li key={index}>
        { message }
      </li>
    ));

    return (
      <ul className='login-card__form__message'>
        { messages }
      </ul>
    );
  }

  render() {
    const {
      email,
      emailMessage,
      password,
      passwordMessage,
    } = this.state;

    return (
      <div className='login-page'>
        <div className='login-card'>
          <header className='login-card__header'>
            <h2 className='login-card__header__title'>
              SIGN UP
            </h2>
          </header>
          <form onSubmit={this.onSubmit} className='login-card__form'>
            <div className='login-card__inputs'>
              <FormInput
                isWhite
                labelText='email'
                type='email'
                name='email'
                value={email}
                onChange={this.onChange}
                autoFocus={true}
                message={emailMessage} />
              <FormInput
                isWhite
                labelText='password'
                type='password'
                name='password'
                value={password}
                onChange={this.onChange}
                message={passwordMessage} />
            </div>
            { this.renderFormMessage() }
            <div className='login-card__buttons'>
              <button className='login-card__submit'>
                sign up
              </button>
              <a href={appRoutes.login} className='login-card__signup-link'>
                Already have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
