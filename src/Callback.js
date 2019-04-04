import React, { Component } from 'react'

export default class Callback extends Component {
  render() {
    return (
      <h1>Loading.........</h1>
    )
  }

  componentDidMount(){
      if(/access_token|state|id_token|error/.test(this.props.location.hash)){
          this.props.auth.handleAuthentication();
      }else{
          throw new Error('Invalid Callback Url');
      }
  }
}
