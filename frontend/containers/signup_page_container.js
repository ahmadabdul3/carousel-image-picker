import { connect } from 'react-redux';
import SignupPage from 'src/frontend/pages/signup_page';

export function mapStateToProps({ }) {
  return { };
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const SignupPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);

export default SignupPageContainer;
