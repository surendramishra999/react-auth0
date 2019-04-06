import auth0 from 'auth0-js';
const REDIRACT_ON_LOGIN='redirect_on_login';
const ROLE_URL="http://localhost:3000/roles";

let _access_token=null;
let _roles=null;
let _expire_at=null;
let _scopes=null;

export default class Auth{
  constructor(history){
   this.history=history;
   this.requestedScope="openid profile email read:courses";
   this.auth0=new auth0.WebAuth({
       domain:process.env.REACT_APP_AUTH0_DOMAIN,
       clientID:process.env.REACT_APP_AUTH0_CLIENT_ID,
       redirectUri:process.env.REACT_APP_AUTH0_CALLBACK_URL,
       audience:process.env.REACT_APP_AUTH0_AUDIENCE,
       responseType:"token id_token",
       scope:this.requestedScope
   });
  }

  login =()=>{
    this.auth0.authorize();
    localStorage.setItem(REDIRACT_ON_LOGIN,JSON.stringify(this.history.location));
  }

  handleAuthentication=()=>{
    this.auth0.parseHash((err,authResult)=>{
      if(authResult && authResult.accessToken && authResult.idToken){
         this.setSession(authResult);
         const redirectUrl=(localStorage.getItem(REDIRACT_ON_LOGIN)==="undefined")
         ?'/':JSON.parse(localStorage.getItem(REDIRACT_ON_LOGIN));
         this.history.push(redirectUrl);
      }else if(err){
        this.history.push('/');
        alert(`Error :${err.error}. Check console log for more details`);
        console.log(err);
      }
    });
  }

  setSession=authResult=>{
    //set expire time
    _expire_at=(authResult.expiresIn * 1000 + new Date().getTime());
    _scopes=authResult.scope || this.requestedScope || '';
    _access_token=authResult.accessToken;
    _roles=authResult.idTokenPayload[ROLE_URL];
  }

  isAuthenticated(){
    return new Date().getTime()<_expire_at;
  }

  logout=()=>{
    _access_token=null;
    _expire_at=null;
    _scopes=null;
    _roles=null;
    localStorage.removeItem(REDIRACT_ON_LOGIN);
    this.userProfile=null;
    this.auth0.logout({
      clientID:process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo:"http://localhost:3000/"
    });
    this.history.push('/');
  }

  getAccessToken=()=>{
    if(!_access_token){
     throw new Error("No Access Token found");
    }
    return _access_token;
  }

  getProfile=cb=>{
   if(this.userProfile) return cb(this.userProfile);
   this.auth0.client.userInfo(this.getAccessToken(),(error,userProfile)=>{
     if(userProfile) this.userProfile=userProfile;
     cb(userProfile,error);
   });

  }

  userHasScopes=(scopes)=>{
   const grantedScopes=(
    _scopes|| ""
   ).split(" ");
   return scopes.every(scope=>grantedScopes.includes(scope));
  }

  checkRole=(role)=>{
    const roles=(
      _roles|| []
    );
    return roles.includes(role);
   }

}