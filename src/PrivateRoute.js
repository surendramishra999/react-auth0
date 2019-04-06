import React from 'react';
import {Route} from 'react-router-dom';

import PropTypes from 'prop-types';

function PrivateRoute({component:Component,auth,scopes,role,...rest}){

    return (
        <Route
            {...rest}
            render={props=>{
                //redirect to login if not login
                if(!auth.isAuthenticated()) return auth.login();
                // display message if user lack scope
                if(scopes.length>0 && !auth.userHasScopes(scopes)){
                  return(
                      <h1>
                          You need following scope(s) to view the page:(" ")
                          {scopes.join(",")}.
                      </h1>
                  );
                }
                if(role.length>0 && !auth.checkRole(role)){
                  return(
                      <>
                      <h1>
                          Access Denied. Your Role is insufficient!
                      </h1>
                      <h3> Page only available to admin. your role is {role}.</h3>
                      </>
                  );
                }

                // render component
                return <Component auth={auth} {...props}/>
            }}
        />
    );

}

PrivateRoute.prototype={
    Component:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    scopes:PropTypes.array,
    role:PropTypes.string
}

PrivateRoute.defaultProps={
    scopes:[],
    role:''
}

export default PrivateRoute;
