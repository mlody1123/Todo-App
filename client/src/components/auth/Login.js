import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import { loginUser } from "../../actions/authActions";
import validator from "validator";

// TODO: Create validation in real time

class Login extends Component {
  state = { email: "", password: "", errors: {}, valid: {} };

  onChangeEmail(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      if (!value) {
        this.setState({ errors: { email: "Email is required" } });
      }
      if (!validator.isEmail(value)) {
        this.setState({ errors: { email: "Email invalid" } });
      } else {
        this.setState({ errors: { email: "" } });
        this.setState({ valid: { email: true } });
      }
    });
  }
  onChangePassword(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      !value
        ? this.setState({ errors: { password: "Password is required" } })
        : this.setState({ errors: { password: null } });
    });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/list");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/list");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sing in to your ToDo List account
              </p>
              <form onSubmit={this.onSubmit.bind(this)} noValidate>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail.bind(this)}
                  error={errors.email}
                  valid={this.state.valid.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangePassword.bind(this)}
                  error={errors.password}
                />
                <input
                  type="submit"
                  className="btn btn-dark btn-block mt-4"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
