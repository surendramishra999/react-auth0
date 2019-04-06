import React, { Component } from 'react'

export default class Public extends Component {

    state ={message:''};

componentDidMount(){
    fetch('/public').then(response=>{
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
      <p>{this.state.message}</p>
    )
  }
}
