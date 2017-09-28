import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddItem.css';
import { authRequest } from '../../services/authRequestService';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input, Select } from '../common/Inputs';
import { addItem } from '../../actions';
import Icon from '../icons/Icon';

class AddItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {
        type: 'facility'
      },
      showModal: false,
      parents: []
    };
    this.updateParents(this.components[0]);
  }

  components = [
    {
      name: 'Facility',
      type: 'facility'
    },
    {
      name: 'Department',
      type: 'department',
      parentType: 'facility'
    },
    {
      name: 'Machine',
      type: 'machine',
      parentType: 'department'
    }
  ];
  parents = [];
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
  updateParents = item => {
    const _self = this;
    this.handleLayerChange(item);
    if (item.parentType) {
      authRequest(`/api/${item.parentType}/`, 'get', result => {
        _self.setState({
          parents: result
        });
      });
    } else if (this.state.model.type !== item.type) {
      console.log('needs to change');

      this.setState({
        hasParent: false,
        parents: []
      });
    }
  };
  addItem = item => {
    this.props.handleAddItem(this.state.model);
    this.onModalClose();
  };
  handleNameChange = name => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        name
      })
    });
  };
  handleSNChange = serialNumber => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        serialNumber
      })
    });
  };
  handleLayerChange = layer => {
    if (layer.parentType) {
      this.setState({
        hasParent: layer.parentType,
        model: Object.assign(
          {},
          {
            name: this.state.model.name,
            type: layer.type
          }
        )
      });
    }
  };
  handleParentChange = parent => {
    const parentModel = {};
    parentModel[parent.type] = parent.id;
    this.setState({
      model: Object.assign({}, this.state.model, parentModel)
    });
  };

  render() {
    return (
      <div className="addItemButton">
        <div onClick={this.openModal}>
          <Icon type="add" />
        </div>
        <Modal className="commonModal" isOpen={this.state.showModal} toggle={this.onModalClose}>
          <div className="closeButton">
            <Icon type="close" handleClick={this.onModalClose} />
          </div>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalBody>
            <div className="addItemWrapper">
              <Input name="Name" onChange={this.handleNameChange} />
              <Input
                name="Serial Number"
                hide={this.state.model.type !== 'manifold'}
                onChange={this.handleSNChange}
              />
              <Select name="Layer" onChange={this.updateParents} options={this.components} />
              <Select
                name="Parent"
                hideIf={!this.state.hasParent}
                options={this.state.parents}
                onChange={this.handleParentChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="add" onClick={this.addItem}>
              Add
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
  handleAddItem: item => dispatch(addItem(item))
});

const AddItem = connect(mapStateToProps, mapDispatchToProps)(AddItemComponent);

export default AddItem;
