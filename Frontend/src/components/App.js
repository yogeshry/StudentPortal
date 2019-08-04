import React, { Component } from 'react'
import CustomPaginationActionsTable from './studentList'
import AddStudent from "./addStudent";
import Login from  "./Login"
import { Switch, Route } from 'react-router-dom'
import Header from "./Header";

class App extends Component {
    studentList = this.props.studentList
    render() {
        return (
            <div className="center w85">
                <Header />
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/"  component={() => <CustomPaginationActionsTable studentList={this.studentList} />} />
                        <Route exact path="/create" component={AddStudent} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App