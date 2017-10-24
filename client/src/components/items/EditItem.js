import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditItem.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input, Select } from '../common/Inputs';
import { deleteItem, updateItem } from '../../actions';
import { authRequest } from '../../services/authRequestService';
import Icon from '../icons/Icon';

class EditItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemModel: props.item,
      parents: [],
      showModal: false
    };

    this.getParentOptions(props.item);
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  };
  onModalClose = () => {
    this.setState({
      showModal: false
    });
  };
  components = [
    {
      name: 'Facility',
      type: 'facility'
    },
    {
      name: 'Department',
      type: 'department'
    },
    {
      name: 'Manifold',
      type: 'manifold'
    },
    {
      name: 'Machine',
      type: 'machine'
    }
  ];

  deleteItem = () => {
    this.props.handleDeleteItem(this.state.itemModel);
    this.setState({
      showModal: false
    });
  };

  updateItem = () => {
    this.setState({
      showModal: false
    });
    this.props.handleUpdateItem(this.state.itemModel);
  };

  getParentOptions = item => {
    const _self = this;
    if (item && item.parent) {
      authRequest(`/api/${item.parent.type}/`, 'get', result => {
        _self.setState({
          parents: result
        });
      });
    }
  };

  handleNameChange = name => {
    console.log("The new name is: ", name);
    this.setState({
      itemModel: Object.assign({}, this.state.itemModel, { name })
    });
  };

  handleParentChange = parent => {
    const parentModel = {};
    parentModel[parent.type] = parent.id;
    parentModel.parent = parent;
    this.setState({
      itemModel: Object.assign({}, this.state.itemModel, parentModel)
    });
  };

  componentWillReceiveProps(props) {
    if (props.item.name !== this.state.itemModel.name) {
      this.setState({
        itemModel: props.item
      });
      this.getParentOptions(props.item);
    }
  }

  render() {
    return (
      <div className="editItemButtonWrapper">
        <div onClick={this.openModal}>
          <Icon type="mode_edit" />
        </div>
        <Modal className="commonModal" isOpen={this.state.showModal} toggle={this.onModalClose}>
          <div className="closeButton">
            <Icon type="close" handleClick={this.onModalClose} />
          </div>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalBody>
            <Input name="Name" model={this.state.itemModel.name} onChange={this.handleNameChange} />
            <Select
              name="Parent"
              hideIf={!this.state.itemModel.parent}
              model={this.state.itemModel.parent}
              onChange={this.handleParentChange}
              options={this.state.parents}
            />
            {() => {
              if (this.state.itemModel.type !== 'facility') {
                return (
                  <Select name="Parent" onChange={this.updateParents} options={this.components} />
                );
              }
            }}
          </ModalBody>
          <ModalFooter>
            <button className="update" onClick={this.updateItem}>
              Update
            </button>
            <button className="delete" onClick={this.deleteItem}>
              Delete
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser.user
});

const mapDispatchToProps = dispatch => ({
  handleDeleteItem: item => dispatch(deleteItem(item)),
  handleUpdateItem: item => dispatch(updateItem(item))
});

const EditItem = connect(mapStateToProps, mapDispatchToProps)(EditItemComponent);

export default EditItem;
