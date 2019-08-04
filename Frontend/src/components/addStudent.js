import React, { Component } from 'react'
import gql from 'graphql-tag'
import {Mutation} from "react-apollo";

class AddStudent extends Component {
    state = {
        name:'',
        classs:'',
        age:'',
        roll:'',
        email:'',
        phone:'',
        address:''
    }

    render() {
        const POST_MUTATION = gql`
    mutation PostMutation($name:String!,
                 $classs:String!,
                 $intage:Int,
                 $roll:String!,
                 $email:String!,
                 $floatphone:Float,
                 $address:String!) {
      addStudent(
                 name:$name,
                 class:$classs,
                 age:$intage,
                 roll:$roll,
                 email:$email,
                 phone:$floatphone,
                 address:$address
  ){
  id
  }
  }
`
        let {   name,
                classs,
                age,
                roll,
                email,
                phone,
                address} = this.state

        const intage = parseInt(age)
        const floatphone = parseFloat(phone)

        return (
            <div>
                <div className="flex flex-column mt3">
                   <div> <input
                        className="mb2"
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        placeholder="Name of student"
                   /></div>
                   <div><input
                        className="mb2"
                        value={classs}
                        onChange={e => this.setState({ classs: e.target.value })}
                        type="text"
                        placeholder="Class"
                   /></div>
                   <div><input
                        className="mb2"
                        value={age}
                        onChange={e => this.setState({ age: e.target.value })}
                        type="text"
                        placeholder="age"
                   /></div>
                    <div><input
                        className="mb2"
                        value={roll}
                        onChange={e => this.setState({ roll: e.target.value })}
                        type="text"
                        placeholder="Roll No"
                    /></div>
                    <div><input
                        className="mb2"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="email"
                        placeholder="Email address"
                    /></div>
                    <div><input
                        className="mb2"
                        value={phone}
                        onChange={e => this.setState({ phone: e.target.value })}
                        type="text"
                        placeholder="Phone number"
                    /></div>
                    <div><input
                        className="mb2"
                        value={address}
                        onChange={e => this.setState({ address: e.target.value })}
                        type="text"
                        placeholder="Address"
                    /></div>
                </div>
                <Mutation
                    mutation={POST_MUTATION}
                    variables={{ name,
                        classs,
                        intage,
                        roll,
                        email,
                        floatphone,
                        address }}
                    onCompleted={() => this.props.history.push('/')}
                >
                    {postMutation => <button onClick={postMutation}>Submit</button>}
                </Mutation>      </div>
        )
    }
}

export default AddStudent