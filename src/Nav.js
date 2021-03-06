import {Link} from 'react-router-dom';

import React, { Component } from 'react'
export default class componentName extends Component {
  render() {
    const {isAuthenticated,login,logout,userHasScopes,checkRole}=this.props.auth;
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
            <Link to="/public">Public</Link>
          </li>   
          {isAuthenticated() && 
          <li>
            <Link to="/private">Private</Link>
          </li>  
          } 
          {isAuthenticated() && userHasScopes(['read:courses']) &&
          <li>
            <Link to="/courses">Courses</Link>
          </li>  
          } 
          {isAuthenticated() && checkRole('admin') &&
          <li>
            <Link to="/admin">Admin</Link>
          </li>  
          }                                  
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
