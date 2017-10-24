import { connect } from 'react-redux';
import AddUser from './add-user';
import { actions } from 'react-redux-form';
import { addNewUser } from '../../actions';
import { toggleUserModal } from '../../redux-modules/view/actions';
import { selectShowUserModal } from '../../selectors/view-selectors';
import { selectFormIsValid, selectNewUser } from '../../selectors/user-selectors';

const mapStateToProps = state => ({
  showModal: selectShowUserModal(state),
  isValid: selectFormIsValid(state)
});

const mapDispatchToProps = dispatch => ({
  onAddUser: () =>
    dispatch((dispatch, getState) => {
      if (selectFormIsValid(getState())) {
        dispatch(addNewUser(selectNewUser(getState())));
        dispatch(toggleUserModal());
        dispatch(actions.reset('forms.addUser'));
      } else {
        console.log('Add user form is not valid.');
      }
    }),
  onToggleModal: () => {
    dispatch(actions.reset('forms.addUser'));
    dispatch(toggleUserModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
