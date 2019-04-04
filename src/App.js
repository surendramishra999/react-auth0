import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Nav from './Nav';
import Auth from './Auth/Auth';
import Callback from './Callback';

class App extends Component {

  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Nav/>
          <div className="body">
          <Route path="/" 
          exact 
          render={(props)=>{return(<Home auth={this.auth} {...this.props} />)}}
          />
          <Route path="/callback" 
          exact 
          render={(props)=>{return(<Callback auth={this.auth} {...this.props} />)}}
          />          
          <Route 
          path="/profile" 
          component={Profile} 
          />
          </div>
      </>
    );
  }
}

export default App;
