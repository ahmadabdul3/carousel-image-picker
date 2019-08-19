import React, { Component } from 'react';
import sessionClient from 'src/frontend/clients/data_api/session_client';
import FormInput from 'src/frontend/components/form_input';
import appRoutes from 'src/constants/routes';


export default class LoginPage extends Component {
  state = {
    email: '',
    emailMessage: '',
    password: '',
    passwordMessage: '',
    formMessage: '',
  };

  constructor(props) {
    super(props);
  }

  onChange = (field, value) => {
    this.setState({ [field]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ formMessage: '' });

    const validationResult = this.validateInputs();
    if (!validationResult) return;

    const { email, password } = this.state;

    // sessionClient.create({ email, password }).then((res) => {
    //   if (res.status === 'fail') {
    //     this.setState({ formMessage: res.message });
    //   } else {
    //     const { router, loginSuccess } = this.props;
    //     localStorage.setItem('jwt-token', res.jwt);
    //     loginSuccess(res.user);
    //     router.push(appRoutes.home);
    //   }
    // });
    const { router, loginSuccess } = this.props;
    localStorage.setItem('jwt-token', 'something');
    loginSuccess({ email: '', name: 'abdul' });
    router.push(appRoutes.home);
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
    const { formMessage } = this.state;

    if (!formMessage) return null;

    return (
      <div className='login-card__form__message'>
        { formMessage }
      </div>
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
              LOGIN
            </h2>
          </header>
          <form onSubmit={this.onSubmit} className='login-card__form'>
            <div className='login-card__inputs'>
              <FormInput
                isWhite
                labelText='email'
                type='email'
                name='email'
                autoFocus={true}
                value={email}
                onChange={this.onChange}
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
                log in
              </button>
              <a href={appRoutes.signup} className='login-card__signup-link'>
                Don't have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
