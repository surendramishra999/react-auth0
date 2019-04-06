const express =require('express');
require('dotenv').config();
const jwt=require("express-jwt"); //validate jwt and set req.user
const jwksRsa=require("jwks-rsa");  // Retrieve RSA key from json web key function

const app =express();

app.get('/public',function(req,res){
    res.json({
        message:"Hello from a public api"
    });
});

var jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://"+process.env.REACT_APP_AUTH0_DOMAIN+"/.well-known/jwks.json"
    }),
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: "https://"+process.env.REACT_APP_AUTH0_DOMAIN+"/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/private',jwtCheck,function(req,res){
    res.json({
        message:"Hello from a private api"
    });
});

app.listen(3001);

console.log("API server listining on "+process.env.REACT_APP_AUTH0_AUDIENCE);