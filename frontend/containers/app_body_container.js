import { connect } from 'react-redux';
import AppBody from 'src/frontend/components/app_body';
import { actions as placeholderActions } from 'src/frontend/redux/placeholder';

export function mapStateToProps({ placeholder }) {
  return {
    placeholderData: placeholder.data,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    addData: (data) => dispatch(placeholderActions.addData(data)),
  };
}

const AppBodyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBody);

export default AppBodyContainer;
