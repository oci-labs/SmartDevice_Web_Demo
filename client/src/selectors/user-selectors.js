export const selectNewUser = state => state.forms.addUser;
export const selectExistingUser = state => state.forms.editUser;
export const selectFormIsValid = state => state.forms.forms.addUser.$form.valid;
export const selectEditFormIsValid = state => state.forms.forms.editUser.$form.valid;
