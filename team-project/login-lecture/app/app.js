const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const members = [
    {
        id:1,
        name:"백경이",
        lab:"최성철",
        loginId:"pknu",
        loginPw:"1234"
    },
    {
        id:2,
        name:"이노아",
        lab:"이유신",
        loginId:"a",
        loginPw:"a"
    },
]

app.use(cookieParser());
app.use(bodyParser.json())




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






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })