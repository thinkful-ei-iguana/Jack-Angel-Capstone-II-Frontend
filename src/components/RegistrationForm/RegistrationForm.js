import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import '../../Styles/RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (

      <div>
        <div className="box">
          <form className="registerForm" onSubmit={this.handleSubmit}>
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>

       
            {/* <Label htmlFor='registration-name-input'>
              Enter your name<Required 
            />
            </Label> */}
            <Input
              placeholder="Full Name"
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              className="landing-form-text"
              required
            />
     
     
            {/* <Label htmlFor='registration-username-input'>
              Choose a username<Required />
            </Label> */}
            <Input
              id='registration-username-input'
              name='username'
              className="landing-form-text"
              placeholder="User Name"
              required
            />
       
        
            {/* <Label htmlFor='registration-password-input'>
              Choose a password<Required />
            </Label> */}
            <Input
              id='registration-password-input'
              placeholder="Choose a Password"
              name='password'
              type='password'
              className="landing-form-text"
              required
            />
            <Button type='submit'>
              Sign up
            </Button>
          </form>
        </div>
        <footer>
          <div className="lower-btns">
            <Link to='/login'>Already have an account?</Link>
          </div>
        </footer>

      </div>
      
    )
  }
}

export default RegistrationForm
