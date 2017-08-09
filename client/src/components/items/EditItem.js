import React, { Component } from "react";
import { connect } from "react-redux";
import "./EditItem.css";

import Modal from "../common/Modal";
import { HorizontalLine } from "../layout/LayoutComponents";
import { Input, Select } from "../common/Inputs";
import { deleteItem, updateItem } from "../../actions";

class EditItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemModel: props.item,
      showModal: false
    };
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
      name: "Facility",
      type: "facility"
    },
    {
      name: "Department",
      type: "department"
    },
    {
      name: "Manifold",
      type: "manifold"
    },
    {
      name: "Machine",
      type: "machine"
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

  handleNameChange = name => {
    this.setState({
      itemModel: Object.assign({}, this.state.itemModel, { name: name })
    });
  };
  componentWillReceiveProps(props) {
    if (props.item.name !== this.state.itemModel.name) {
      this.setState({
        itemModel: props.item
      });
    }
  }

  render() {
    return (
      <div className="editItemButtonWrapper">
        <div onClick={this.openModal}>
          {this.props.children}
        </div>
        <Modal show={this.state.showModal} onClose={this.onModalClose}>
          <div className="editItemWrapper">
            <div className="editItemTitle">Edit Item</div>
            <HorizontalLine />
            <Input
              name="Name"
              model={this.state.itemModel.name}
              onChange={this.handleNameChange}
            />
            {() => {
              if (this.state.itemModel.type !== "facility") {
                return (
                  <Select
                    name="Parent"
                    onChange={this.updateParents}
                    options={this.components}
                  />
                );
              }
            }}
            <button className="update" onClick={this.updateItem}>
              Update
            </button>
            <button className="delete" onClick={this.deleteItem}>
              Delete
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteItem: item => {
      dispatch(deleteItem(item));
    },
    handleUpdateItem: item => {
      dispatch(updateItem(item));
    }
  };
};

const EditItem = connect(null, mapDispatchToProps)(EditItemComponent);

export default EditItem;
