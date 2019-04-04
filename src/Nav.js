import {Link} from 'react-router-dom';

import React, { Component } from 'react'
export default class componentName extends Component {
  render() {
    const {isAuthenticated,login,logout}=this.props.auth;
    return (
      <nav>
         <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={isAuthenticated() ? logout:login}>
                {isAuthenticated() ? 'Log Out':'Log In'}
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}
