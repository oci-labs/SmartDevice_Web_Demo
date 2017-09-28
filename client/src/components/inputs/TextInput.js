import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';

const displayName = 'TextInput';
const propTypes = {
  model: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const TextInput = ({ name, model, ...props }) => (
  <div className="commonInputWrapper">
    <label className="commonInputLabel" htmlFor={model}>
      {name}
    </label>
    <Control.text className="commonInput" model={model} {...props} />
  </div>
);

TextInput.displayName = displayName;
TextInput.propTypes = propTypes;

export default TextInput;
