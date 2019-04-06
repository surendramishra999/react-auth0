import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from './AuthContext';


export default class Home extends Component {
  render() {
    
    return (
    <AuthContext.Consumer>
      {auth=>(
      <div>
        <h1>Home</h1>
        { auth.isAuthenticated() ?
        (<Link to="/profile" >Profile</Link>):(
        <button onClick={auth.login} >Log In</button>
        )
        }
      </div>
      )}
      </AuthContext.Consumer>
    )
  }
}
