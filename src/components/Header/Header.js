import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import '../../Styles/Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <h4 className="users-book">
          {this.context.user.name}
        </h4>
        <div className="navbar">
          <nav>
            <Link to='/login'
              onClick={this.handleLogoutClick}
              >
              Logout
            </Link>
          </nav>
        </div>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
            <h1> Spaced repetition </h1>
          </Link>
        </h1>
        <section> 
          <p className="summary">
            Practice learning Spanish with the spaced repetition.
          </p>
        </section>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
