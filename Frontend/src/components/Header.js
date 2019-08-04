import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constant'

class Header extends Component {

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <div className="flex pa1 justify-between nowrap orange">
                <div className="flex flex-fixed black">
                    <div className="fw7 mr1"><h1>Student Portal Management</h1></div>
                    <button><Link to="/" className="ml1 no-underline black">
                        Show students list
                    </Link></button>
                    {authToken && (
                        <div className="flex">
                            <button>
                            <Link to="/create" className="ml1 no-underline black">
                                Add new student
                            </Link></button>
                        </div>
                    )}
                </div>
                <div className="flex flex-fixed">
                    {authToken ? (
                        <button
                            className="ml1 pointer black"
                            onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN)
                                this.props.history.push(`/`)
                            }}
                        >
                            logout
                        </button>
                    ) : (
                       <button> <Link to="/login" className="ml1 no-underline black">
                            login
                        </Link></button>
                    )}
                </div>
            </div>
        )
    }
}
export default withRouter(Header)