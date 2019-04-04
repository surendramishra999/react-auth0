import React, { Component } from 'react';

export default class Profile extends Component {

  state ={
    profile:null,
    error:""
  };

  componentDidMount(){
    this.loadUserProfile();
  }

  loadUserProfile(){
   const cb=(profile,error)=>{
    this.setState({profile,error});
   }; 
   this.props.auth.getProfile(cb);
  }

  render() {
    const {profile}=this.state;
    if(!profile) return null;
    return (
      <div>
        <h1>Profile</h1>
        <p>{profile.nickname}</p>
        <img style={{maxWidth:50,maxHeight:50}} src={profile.picture} alt="profile pic"/>
        <pre>{JSON.stringify(profile,null,2)}</pre>

      </div>
    )
  }
}
