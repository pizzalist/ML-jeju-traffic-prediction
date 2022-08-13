"use strict";
const { rejects } = require('assert');
const { resolve } = require('path');
const crypto = require('crypto');
const db = require("../confilg/db");

// 유저정보 db저장
console.log('누구나년..: ')
class UserStorage {
    static #getUserInfo(data, email) {
        const users = JSON.parse(data);
        const emailx = users.email.indexOf(email);
        const userKeys = Object.keys(users);
        const userInfo = userKeys.reduce((newUser,info)=> {
                    newUser[info] = users[info][emailx];
                    return newUser;
                }, {});
                return userInfo;
    }
    static #getUsers(data,isAll, fields) {
        const users = JSON.parse(data);
        if(isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
    

    static getUserInfo(req, res) {
        console.log("req.body :", req.body);
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM users WHERE email = ?";
            db.query(query,[req.body.email], (err, data) =>{
                if (err) reject(`${err}`);
                console.log("data :" , data);
                resolve(res.send(200, {success: "로그인 성공"}));

            });
        
        });
    }

    

    static async save(req, res) {
        console.log("req.body: ", req.body)
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO users(name, email, password, lab) VALUES(?,?,?,?);";
            const userData = req.body;
            // const cryptoPassword= crypto.createHash('sha512').update(userData.password).digest('base64'); // 비밀번호 암호화
            db.query(
                query,
                [userData.name, userData.email, userData.password, userData.lab], 
                (err) =>{
                if (err) reject(`${err}`);
                resolve(res.send(200, {success: "회원가입 성공"}));
            });
        });
    }
}
module.exports = UserStorage;