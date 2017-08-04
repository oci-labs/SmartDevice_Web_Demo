import React, { Component } from "react";
import "./AddItem.css";
import { SERVER_URL } from "../../config";

import Modal from "../common/Modal";
import { HorizontalLine } from "../layout/LayoutComponents";
import { Input, Select } from "../common/Inputs";

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    fetch(`${SERVER_URL}/api/${item.type}/`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          parents: response
        });
      });
  };
  render() {
    return (
      <div className="addItemButton" onClick={this.openModal}>
        {this.props.children}
        <Modal show={this.state.showModal} onClose={this.onModalClose}>
          <div className="addItemWrapper">
            <div className="addItemTitle">Add New Item</div>
            <HorizontalLine />
            <Input name="Name" />
            <Select
              name="Layer"
              onChange={this.updateParents}
              options={this.components}
            />
            <Select name="Parent" options={this.state.parents} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddItem;
