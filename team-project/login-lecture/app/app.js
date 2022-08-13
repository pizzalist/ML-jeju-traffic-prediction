const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const db = require("../app/server/src/confilg/db");
const { data } = require('jquery')


const members = [
    {
        id:1,
        name:"백경이",
        lab:"이노아",
        loginId:"pknu",
        loginPw:"1234"
    },
    {
        id:2,
        name:"이노아",
        lab:"일론머스크",
        loginId:"a",
        loginPw:"a"
    },
]

app.use(cookieParser());
app.use(bodyParser.json())


//로그인

app.get('/api/account', (req, res) => {
    if(req.cookies && req.cookies.account){
    const member = JSON.parse(req.cookies.account);
    if(member.id) {
        return res.send(member);
    }
}
    
    res.sendStatus(401)
})

app.post('/api/account', (req, res) => {

    const loginId=   req.body.loginId;
    const loginPw=   req.body.loginPw;
    
    // const query = "SELECT * FROM users WHERE loginId = ?";
    //         db.query(query,[loginId], (err, data) =>{
    //             if (err) reject(`${err}`);
    //             return(data[0]);
    //         });

    const member= members.find(m=> m.loginId === loginId && m.loginPw === loginPw);
    if(member) {
        const options ={
            domain:"lacalhost",
            path:"/",
            httpOnly:true,
        };
        
        res.cookie("account",JSON.stringify(member), );
        res.send(member);
    }
    else{
        res.send(404)
    }
}) 

app.delete('/api/account', (req, res) => {
    if (req.cookies && req.cookies.account) {
        res.clearCookie("account");
    }

    res.sendStatus(200);
})  

//회원가입







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })