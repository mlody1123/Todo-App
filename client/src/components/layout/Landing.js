import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/list");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="container">
          <div className="jumbotron pl-4">
            <h1 className="display-4 ">Hello, to my ToDo List app</h1>
            <p className="lead  ">
              {" "}
              If u want too try this app please Sign Up{" "}
            </p>
            <Link to="/register">
              <button className="btn btn-primary btn-md">Sing Up</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Landing);
