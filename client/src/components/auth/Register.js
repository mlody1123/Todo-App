import React, { Component } from 'react'
import TextFieldGroup from '../../common/TextFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { registerUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import validator from 'validator'

// TODO: Create validation in real time use switch  to onChange function to each target ------  const validate = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;  -------

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    valid: {}
  }

  validation(e) {
    const name = e.target.name
    const value = e.target.value
    switch (name) {
      case 'email':
        if (!value) {
          return this.setState({ errors: { email: 'Email is required' } })
        }
        if (!validator.isEmail(value)) {
          return this.setState({ errors: { email: 'Email invalid' } })
        } else {
          return this.setState({
            errors: { email: '' },
            valid: { email: true }
          })
        }

      case 'password':
        if (!value) {
          return this.setState({
            errors: { password: 'Password is required' }
          })
        }
        if (value.length < 6) {
          return this.setState({
            errors: { password: 'Password must have at least 6 characters' }
          })
        } else {
          return this.setState({ errors: { password: '' } })
        }

      case 'password2':
        if (!value) {
          return this.setState({
            errors: { password2: 'Confirm Password is required' }
          })
        }
        if (value !== this.state.password) {
          return this.setState({
            errors: { password2: 'Confirm Password  must match' }
          })
        } else {
          return this.setState({ errors: { password2: '' } })
        }

      default:
        break
    }
  }

  onChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [e.target.name]: e.target.value }, () => {
      switch (name) {
        case 'email':
          if (!value) {
            return this.setState({ errors: { email: 'Email is required' } })
          }
          if (!validator.isEmail(value)) {
            return this.setState({ errors: { email: 'Email invalid' } })
          } else {
            return this.setState({
              errors: { email: '' },
              valid: { email: true }
            })
          }

        case 'password':
          if (!value) {
            return this.setState({
              errors: { password: 'Password is required' }
            })
          }
          if (value.length < 6) {
            return this.setState({
              errors: { password: 'Password must have at least 6 characters' }
            })
          } else {
            return this.setState({ errors: { password: '' } })
          }

        case 'password2':
          if (!value) {
            return this.setState({
              errors: { password2: 'Confirm Password is required' }
            })
          }
          if (value !== this.state.password) {
            return this.setState({
              errors: { password2: 'Confirm Password  must match' }
            })
          } else {
            return this.setState({ errors: { password2: '' } })
          }

        default:
          break
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const registerData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(registerData, this.props.history)
  }
  render() {
    const { errors } = this.state
    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto'>
              <h1 className='display-4 text-center'>Register new user</h1>
              <p className='lead text-center' />
              <form onSubmit={this.onSubmit.bind(this)} noValidate>
                <TextFieldGroup
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange.bind(this)}
                  error={errors.name}
                  valid={this.state.valid.name}
                />
                <TextFieldGroup
                  placeholder='Email'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange.bind(this)}
                  error={errors.email}
                  valid={this.state.valid.email}
                />
                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange.bind(this)}
                  error={errors.password}
                  valid={this.state.valid.password}
                  info='Password must have at least 6 characters'
                />
                <TextFieldGroup
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={this.state.password2}
                  onChange={this.onChange.bind(this)}
                  error={errors.password2}
                  valid={this.state.valid.password2}
                />
                <input
                  type='submit'
                  className='btn btn-block btn-dark mt-4'
                  value='Register'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
