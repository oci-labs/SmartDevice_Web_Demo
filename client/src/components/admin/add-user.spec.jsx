/* global describe, it, expect, jest, renderedSnapshot, shallow, mount */
import React from 'react';
import { Modal, ModalFooter } from 'reactstrap';
import AddUser from './add-user';
import { Provider } from 'react-redux';
import { ReactWrapper } from 'enzyme';

describe('AddUser component', () => {
  it('should render as expected', () => {
    renderedSnapshot(<AddUser showModal={false} onAddUser={jest.fn()} onToggleModal={jest.fn()} />);
  });

  it('should pass appropriate values to modal', () => {
    const onToggle = jest.fn();
    const rendered = shallow(
      <AddUser showModal isValid onAddUser={jest.fn()} onToggleModal={onToggle} />
    );

    const modal = rendered.find(Modal);
    expect(modal.prop('isOpen')).toBeTruthy();
    expect(modal.prop('toggle')).toBe(onToggle);
  });

  it('should enable the add button if the form is valid', () => {
    const rendered = shallow(
      <AddUser showModal isValid onAddUser={jest.fn()} onToggleModal={jest.fn()} />
    );

    const addButton = rendered.find('button.addUserModalButton');
    expect(addButton.prop('disabled')).toBeFalsy();
    expect(addButton.prop('className')).toEqual(expect.stringContaining('enabled'));
  });

  it('should disable the add button if the form is not valid', () => {
    const rendered = shallow(
      <AddUser showModal isValid={false} onAddUser={jest.fn()} onToggleModal={jest.fn()} />
    );

    const addButton = rendered.find('button.addUserModalButton');
    expect(addButton.prop('disabled')).toBeTruthy();
    expect(addButton.prop('className')).not.toEqual(expect.stringContaining('enabled'));
  });

  it('should apply onAddUser to the add button onClick', () => {
    const addUser = jest.fn();
    const rendered = shallow(
      <AddUser showModal isValid={false} onAddUser={addUser} onToggleModal={jest.fn()} />
    );

    const addButton = rendered.find('button.addUserModalButton');
    expect(addButton.prop('onClick')).toBe(addUser);
  });
});
