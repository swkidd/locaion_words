import React from "react"
import { navigate} from "@reach/router"
import { Link } from 'gatsby'
import Error from './Error'
import { Auth } from 'aws-amplify'

const initialState = {
  email: '',
  password: ``,
  authCode: '',
  stage: 0,
  error: ''
}


class SignUp extends React.Component {
  state = initialState

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    this.signUp();
  }

  signUp = async() => {
    const { email, password } = this.state
    try {
      //use email as username
      await Auth.signUp({ username: email, password, attributes: { email }})
      this.setState({ stage: 1 })
    } catch (err) {
      this.setState({ error: err })
      console.log('error signing up...', err)
    }
  }

  confirmSignUp = async() => {
    const { email, authCode } = this.state
    try {
      await Auth.confirmSignUp(email, authCode)
      alert('Successfully signed up!')
      navigate("/app/login")
    } catch (err) {
      this.setState({ error: err })
      console.log('error confirming signing up...', err)
    }
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        {
          this.state.stage === 0 && (
            <form onSubmit={this.onFormSubmit} style={styles.formContainer}>
              {this.state.error && <Error errorMessage={this.state.error}/>}
              <input
                onChange={this.handleUpdate}
                placeholder='Email'
                name='email'
                value={this.state.email}
                type="email"
                style={styles.input}
              />
              <input
                onChange={this.handleUpdate}
                placeholder='Password'
                name='password'
                value={this.state.password}
                type='password'
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                <span style={styles.buttonText}>Sign Up</span>
              </button>
            </form >
          )
        }
        {
          this.state.stage === 1 && (
            <div style={styles.formContainer}>
              {this.state.error && <Error errorMessage={this.state.error}/>}
              <input
                onChange={this.handleUpdate}
                placeholder='Authorization Code'
                name='authCode'
                value={this.state.authCode}
                style={styles.input}
              />
              <div style={styles.button} onClick={this.confirmSignUp}>
                <span style={styles.buttonText}>Confirm Sign Up</span>
              </div>
            </div>
          )
        }
        <Link to="/app/login">Sign In</Link>
      </div>
    )
  }
}

const styles = {
  input: {
    height: 40, margin: '10px 0px', padding: 7
  },
  formContainer: {
    display: 'flex', flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rebeccapurple', padding: '15px 7px', cursor: 'pointer', textAlign: 'center', marginBottom: 10
  },
  buttonText: {
    color: 'white'
  }
}

export default SignUp