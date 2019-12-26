import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteItem, changeStatus } from "../../actions/todoActions";
import classnames from "classnames";

//TODO: Do custom tooltip

class ListItem extends Component {
  state = { idItem: {} };

  onMouseEnterHandler(id) {
    this.setState({ idItem: { id: id, visible: true } });
  }
  onMouseLeaveHandler(id) {
    this.setState({ idItem: { id: id, visible: false } });
  }

  onDeleteHandler(id) {
    this.props.deleteItem(id);
  }
  onStatusHandler(id) {
    this.props.changeStatus(id);
  }
  render() {
    const { item } = this.props;

    const iconClass = classnames("btn d-inline ", {
      "text-success": !item.active,
      "text-secondary": item.active
    });

    return (
      <div>
        <div
          onMouseEnter={this.onMouseEnterHandler.bind(this, item._id)}
          onMouseLeave={this.onMouseLeaveHandler.bind(this, item._id)}
          className="mb-2 border-bottom d-block  text-left"
        >
          <button
            className={iconClass}
            onClick={this.onStatusHandler.bind(this, item._id)}
          >
            <i className="fas fa-check-circle" />
          </button>

          <p className="d-inline float-none">{item.text}</p>
          {this.state.idItem.id === item._id && this.state.idItem.visible ? (
            <button
              onClick={this.onDeleteHandler.bind(this, item._id)}
              title="Delete"
              className="btn d-inline float-right"
            >
              <i className="fas fa-trash-alt text-danger" />
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteItem, changeStatus }
)(ListItem);
