import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import '../../Styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
  state = {
    isOpen: false
  }

  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  handleMenuClicked = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  renderLogoutLink() {
    return (
      <div>
        <nav className={this.state.isOpen ? "user-links open" : "user-links"}>
          <span className="user-name">
            {this.context.user.name}
          </span>
            <div className="divider" />
          <Link to='/'> Home </Link>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
          <FontAwesomeIcon
            icon={this.state.isOpen ? faTimes : faBars} size="3px"
            className="burger"
            onClick={() => this.handleMenuClicked()}
          />

        </nav>

      </div>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
            <h1> Spanish </h1>
          </Link>
        </h1>
        <section> 
          <p>
            Learn Spanish with the spaced reptition.
          </p>
        </section>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : null }
      </header>
    );
  }
}

export default Header
