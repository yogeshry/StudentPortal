import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constant'
import gql from 'graphql-tag'
import {Mutation} from "react-apollo";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $firstName: String!,$lastName:
           String!, $floatmobileNumber: Float, $gender: String!, $birthString: String! ) {
    signup(
    firstName: $firstName
    email: $email
    password: $password
    lastName: $lastName
    mobileNumber:$floatmobileNumber
    gender:$gender
    birthString:$birthString) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
class Login extends Component {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        lastName: '',
        mobileNumber:'',
        gender:'',
        birthString:'',
        firstName:''
    }


    render() {
        const { login, email, password, lastName,
            mobileNumber,
            gender,
            birthString,
            firstName } = this.state
        let floatmobileNumber = parseFloat(mobileNumber)
        return (
            <div>
                <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
                <div className="flex flex-column">
                    {!login && (
                        <input
                            value={firstName}
                            onChange={e => this.setState({ firstName: e.target.value })}
                            type="text"
                            placeholder="first name"
                        />
                    )}
                    <div>  {!login && (
                        <input
                            value={lastName}
                            onChange={e => this.setState({ lastName: e.target.value })}
                            type="text"
                            placeholder="last name"
                        />
                    )}</div>
                    <div>{!login && (

                        <input
                            value={gender}
                            onChange={e => this.setState({ gender: e.target.value })}
                            type="text"
                            placeholder="Gender"
                        />
                    )}</div>
                    <div> {!login && (
                        <input
                            value={mobileNumber}
                            onChange={e => this.setState({ mobileNumber: e.target.value })}
                            type="text"
                            placeholder="mobile number"
                        />
                    )}</div>
                    <div> {!login && (
                        <input
                            value={birthString}
                            onChange={e => this.setState({ birthString: e.target.value })}
                            type="date"
                            placeholder="birthDate"
                        />
                    )}
                        {!login &&(<p>birth date</p>)}</div>

                    <div>
                    <input
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="email"
                        placeholder="Your email address"
                    /></div>
                    <div><input
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })}
                        type="password"
                        placeholder="Choose a safe password"
                    /></div>
                </div>
                <div className="flex mt3">
                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{ firstName,
                            email,
                            password,
                            lastName,
                            floatmobileNumber,
                            gender,
                            birthString}}
                        onCompleted={data => this._confirm(data)}
                    >
                        {mutation => (
                            <button className="pointer mr2 button" onClick={mutation}>
                                {login ? 'login' : 'create account'}
                            </button>
                        )}
                    </Mutation>
                    <div>
                    <button
                        className="pointer button"
                        onClick={() => this.setState({ login: !login })}
                    >
                        {login
                            ? 'Create new account?'
                            : 'Already have an account?'}
                    </button></div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default Login