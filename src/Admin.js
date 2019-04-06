import React, { Component } from 'react'

export default class Admin extends Component {

    state ={message:[]};

componentDidMount(){
    fetch('/admin',{
      headers:{Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    }).then(response=>{
        if(response.ok) return response.json();
        throw new Error('Response is not ok');
    }).then(response=>{
        this.setState({message:response.message})
    }).catch(error=>{
        this.setState({message:error.message}) 
     })

}
  render() {
    return (
     <h2>{this.state.message}</h2>
    )
  }
}
