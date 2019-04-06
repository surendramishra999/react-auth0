import React, { Component } from 'react';
import {Route} from 'react-router-dom';
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
import AuthContext from './AuthContext';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
    auth:new Auth(this.props.history)
    };
  }
  render() {
    const {auth} =this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} {...this.props} />
          <div className="body">
          <Route path="/" 
          exact 
          render={(props)=>{return(<Home  {...this.props} />)}}
          />
          <Route path="/callback" 
          exact 
          render={(props)=>{return(<Callback auth={auth} {...this.props} />)}}
          />  

          <Route  path="/public" component={Public} /> 

          <PrivateRoute path="/private"  component={Private} />

          <PrivateRoute path="/courses"  scopes={['read:courses']} component={Courses}  />
          
          <PrivateRoute path="/profile"  component={Profile} />

          <PrivateRoute path="/admin"  component={Admin} roles={'admin'} />

          </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
