import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <div>
        <div className="root-container">
          <h2>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
      </div>
    );
  }
}

export default LoginRoute
