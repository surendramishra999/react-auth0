import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Nav from './Nav';
import Auth from './Auth/Auth';
import Callback from './Callback';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';
import Admin from './Admin';
import PrivateRoute from './PrivateRoute';

class App extends Component {

  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Nav auth={this.auth} {...this.props} />
          <div className="body">
          <Route path="/" 
          exact 
          render={(props)=>{return(<Home auth={this.auth} {...this.props} />)}}
          />
          <Route path="/callback" 
          exact 
          render={(props)=>{return(<Callback auth={this.auth} {...this.props} />)}}
          />  
          
          <Route  path="/public" component={Public} /> 

          <PrivateRoute path="/private" auth={this.auth} component={Private} />

          <PrivateRoute path="/courses" auth={this.auth} scopes={['read:courses']} component={Courses}  />
          
          <PrivateRoute path="/profile" auth={this.auth} component={Profile} />

          <PrivateRoute path="/admin" auth={this.auth} component={Admin} roles={'admin'} />

          </div>
      </>
    );
  }
}

export default App;
