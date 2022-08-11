"use strict";
const { rejects } = require('assert');
const { resolve } = require('path');
const db = require("../confilg/db");


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
    

    static getUserInfo(email) {
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM users WHERE email = ?";
            db.query(query,[email], (err, data) =>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        
        });
    }

    

    static async save(userInfo) {
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO users(email, name, password,lab) VALUES(?,?,?,?);";
            db.query(
                query,
                [userInfo.email, userInfo.name, userInfo.password, userInfo.lab], 
                (err) =>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        
        });
    }
}
module.exports = UserStorage;