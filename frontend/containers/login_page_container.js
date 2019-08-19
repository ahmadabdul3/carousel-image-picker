import { connect } from 'react-redux';
import LoginPage from 'src/frontend/pages/login_page';

export function mapStateToProps({ }) {
  return { };
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageContainer;
