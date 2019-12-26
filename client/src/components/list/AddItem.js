import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addItem } from "../../actions/todoActions";

class AddItem extends Component {
  state = { text: "", errors: {} };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    if (this.state.text === "") {
      this.setState({ errors: { text: "This field cannot be empty" } });
    }
    e.preventDefault();

    const itemData = {
      text: this.state.text
    };

    this.props.addItem(itemData);
    this.setState({ text: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="addItem mt-4">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="container">
            <div className="row  ">
              <div className="col-md-10 pr-0 pl-20">
                <TextFieldGroup
                  placeholder="Task Name"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange.bind(this)}
                  error={errors.task}
                />
              </div>
              <div className="col-md-2 pl-0 ">
                <span>
                  <button type="submit" className="btn mb-2">
                    <i className="fas fa-plus-circle fa-2x text-primary" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddItem.propTypes = {
  error: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.errors
});

export default connect(
  mapStateToProps,
  { addItem }
)(AddItem);
