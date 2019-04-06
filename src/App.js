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
          <Route path="/private" 
          exact 
          render={(props)=>{return(
          
            this.auth.isAuthenticated()?<Private auth={this.auth} {...this.props} />:this.auth.login()
          
          )}}
          /> 
          <Route path="/courses" 
          exact 
          render={(props)=>{return(
          
            this.auth.isAuthenticated() && this.auth.userHasScopes(['read:courses'])?<Courses auth={this.auth} {...this.props} />:this.auth.login()
          
          )}}
          />                           
          <Route 
          path="/profile" 
          render={(props)=>{
            return(
            this.auth.isAuthenticated()? (<Profile auth={this.auth} {...props}/>):(<Redirect to="/"/>)
          )
          }}
          />
          </div>
      </>
    );
  }
}

export default App;
