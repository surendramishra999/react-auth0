import {Link} from 'react-router-dom';

import React, { Component } from 'react'
export default class componentName extends Component {
  render() {
    return (
      <nav>
         <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
