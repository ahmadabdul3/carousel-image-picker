import { connect } from 'react-redux';
import HomePage from 'src/frontend/pages/home_page';

export function mapStateToProps({ }) {
  return {
  };
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageContainer;
