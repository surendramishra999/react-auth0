import auth0 from 'auth0-js';
import Profile from './../Profile';


export default class Auth{
  constructor(history){
   this.history=history;
   this.auth0=new auth0.WebAuth({
       domain:process.env.REACT_APP_AUTH0_DOMAIN,
       clientID:process.env.REACT_APP_AUTH0_CLIENT_ID,
       redirectUri:process.env.REACT_APP_AUTH0_CALLBACK_URL,
       responseType:"token id_token",
       scope:"openid profile email"
   });
  }

  login =()=>{
    this.auth0.authorize();
  }

  handleAuthentication=()=>{
    this.auth0.parseHash((err,authResult)=>{
      if(authResult && authResult.accessToken && authResult.idToken){
         this.setSession(authResult);
         this.history.push('/');
      }else if(err){
        this.history.push('/');
        alert(`Error :${err.error}. Check console log for more details`);
        console.log(err);
      }
    });
  }

  setSession=authResult=>{
    //set expire time
    const expireAt=JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem('access_token',authResult.accessToken);
      localStorage.setItem('id_token',authResult.idToken);
      localStorage.setItem('expire_at',expireAt);
  }

  isAuthenticated(){
    const expireAt=JSON.parse(localStorage.getItem('expire_at'));
    return new Date().getTime()<expireAt;
  }

  logout=()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expire_at');
    this.userProfile=null;
    this.auth0.logout({
      clientID:process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo:"http://localhost:3000/"
    });
    this.history.push('/');
  }

  getAccessToken=()=>{
    const accessToken=localStorage.getItem("access_token");
    if(!accessToken){
     throw new Error("No Access Token found");
    }
    return accessToken;
  }

  getProfile=cb=>{
   if(this.userProfile) return cb(this.userProfile);
   this.auth0.client.userInfo(this.getAccessToken(),(error,userProfile)=>{
     if(userProfile) this.userProfile=userProfile;
     cb(userProfile,error);
   });

  }

}