import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddItem.css";
import { SERVER_URL } from "../../config";

import Modal from "../common/Modal";
import { HorizontalLine } from "../layout/LayoutComponents";
import { Input, Select } from "../common/Inputs";
import { addItem } from "../../actions";

class AddItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {
        type: "facility"
      },
      showModal: false,
      parents: []
    };
    this.updateParents(this.components[0]);
  }
  components = [
    {
      name: "Facility",
      type: "facility"
    },
    {
      name: "Department",
      type: "department",
      parentType: "facility"
    },
    {
      name: "Machine",
      type: "machine",
      parentType: "department"
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
    this.handleLayerChange(item);
    if (item.parentType) {
      fetch(`${SERVER_URL}/api/${item.parentType}/`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.setState({
            parents: response
          });
        });
    } else {
      if (this.state.model.type !== item.type) {
        console.log("needs to change");

        this.setState({
          hasParent: false,
          parents: []
        });
      }
    }
  };
  addItem = item => {
    this.props.handleAddItem(this.state.model);
    this.onModalClose();
  };
  handleNameChange = name => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        name: name
      })
    });
  };
  handleSNChange = serialNumber => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        serialNumber: serialNumber
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
    let parentModel = {};
    parentModel[parent.type] = parent.id;
    this.setState({
      model: Object.assign({}, this.state.model, parentModel)
    });
  };
  render() {
    return (
      <div className="addItemButton">
        <div onClick={this.openModal}>
          {this.props.children}
        </div>
        <Modal show={this.state.showModal} onClose={this.onModalClose}>
          <div className="addItemWrapper">
            <div className="addItemTitle">Add New Item</div>
            <HorizontalLine />
            <Input name="Name" onChange={this.handleNameChange} />
            <Input
              name="Serial Number"
              hide={this.state.model.type !== "manifold"}
              onChange={this.handleSNChange}
            />
            <Select
              name="Layer"
              onChange={this.updateParents}
              options={this.components}
            />
            <Select
              name="Parent"
              hideIf={!this.state.hasParent}
              options={this.state.parents}
              onChange={this.handleParentChange}
            />
            <button className="add" onClick={this.addItem}>
              Add
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddItem: function(item) {
      dispatch(addItem(item));
    }
  };
};

const AddItem = connect(null, mapDispatchToProps)(AddItemComponent);

export default AddItem;
