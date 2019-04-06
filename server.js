const express =require('express');
require('dotenv').config();
const jwt=require("express-jwt"); //validate jwt and set req.user
const jwksRsa=require("jwks-rsa");  // Retrieve RSA key from json web key function
const checkScope =require("express-jwt-authz") //validate jwt scopes

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

function checkRole(role){
    return function (req,res,next){
        const assignRoles=req.user['http://localhost:3000/roles'];
        if(Array.isArray(assignRoles) && assignRoles.includes(role)){
            return next();
        }else{
            res.status(401);
            res.send("Insufficient Role");
        }

    }
}

app.get('/admin',jwtCheck,checkRole('admin'),function(req,res){
    res.json({
        message:"Welcome Admin"
    });
});


app.get('/course',jwtCheck,checkScope(["read:courses"]), function(req,res){
    res.json({
       courses:[
           {id:1, title:"Math"},
           {id:2, title:"English"},
           {id:3, title:"Hindi"},
           {id:4, title:"History"},
           {id:5, title:"Social Science"},
           {id:6, title:"Science"}
       ]
    });
});

app.listen(3001);

console.log("API server listining on "+process.env.REACT_APP_AUTH0_AUDIENCE);